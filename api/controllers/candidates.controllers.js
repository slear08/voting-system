import Candidates from "../models/candidates.model.js";
import Organization from "../models/organizations.model.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { upload, storage } from "../middlewares/upload.middleware.js";

// Controller for getting all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidates.find().populate("organization");
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting candidates by Organization ID
export const getCandidatesByOrganizationId = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const candidates = await Candidates.find({
      organization: organizationId,
    });
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json({ candidates, organization });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller for getting a candidate by ID
export const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidates.findById(id).populate("organization");
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for creating a new candidate
export const createCandidate = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      try {
        const { file } = req;

        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        const storageRef = ref(
          storage,
          `voting-system/candidate-profile/${file.originalname}`
        );
        const metadata = {
          contentType: file.mimetype,
        };
        const snapshot = await uploadBytesResumable(
          storageRef,
          file.buffer,
          metadata
        );
        const downloadURL = await getDownloadURL(snapshot.ref);

        const newCandidate = new Candidates({
          profile: downloadURL,
          ...req.body,
        });

        await newCandidate.save();

        res.status(201).json({
          message: "Candidates saved successfully",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error saving",
          error: error.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      const { id } = req.params;
      let updateData = { ...req.body };
      try {
        if (err) {
          return res.status(400).json({ message: "Error uploading file" });
        }

        if (req.file) {
          const { file } = req;

          const storageRef = ref(
            storage,
            `voting-system/candidate-profile/${file.originalname}`
          );
          const metadata = {
            contentType: file.mimetype,
          };
          const snapshot = await uploadBytesResumable(
            storageRef,
            file.buffer,
            metadata
          );
          const downloadURL = await getDownloadURL(snapshot.ref);

          updateData.profile = downloadURL;
        }

        if (
          Array.isArray(updateData.achievements) &&
          updateData.achievements[0] === ""
        ) {
          updateData.achievements = [];
        }

        if (
          Array.isArray(updateData.platforms) &&
          updateData.platforms[0] === ""
        ) {
          updateData.platforms = [];
        }

        const updatedCandidate = await Candidates.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        if (!updatedCandidate) {
          return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json({
          message: "Candidate updated successfully",
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a candidate
export const deleteCandidates = async (req, res) => {
  const { ids } = req.body;
  try {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "IDs array is missing or empty" });
    }

    const deletedCandidates = await Candidates.deleteMany({
      _id: { $in: ids },
    });
    if (!deletedCandidates || deletedCandidates.deletedCount === 0) {
      return res.status(404).json({ message: "Candidates not found" });
    }

    res.json({ message: "Candidates deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResult = async (req, res) => {
  try {
    // Fetch all candidates from the database
    const allCandidates = await Candidates.find({}).populate(
      "organization",
      "title"
    );

    // Group candidates by organization
    const candidatesByOrganization = allCandidates.reduce((acc, candidate) => {
      const orgId = candidate.organization._id.toString(); // Convert ObjectId to string
      const orgTitle = candidate.organization.title; // Extract organization title
      const formattedCandidate = {
        orgID: orgId,
        orgTitle: orgTitle,
        fullname: candidate.fullname,
        position: candidate.position,
        voteCounts: candidate.voteCounts,
      };
      acc[candidate.organization._id] = acc[candidate.organization._id] || {
        orgID: orgId,
        orgTitle: orgTitle,
        positions: {},
      };
      acc[candidate.organization._id].positions[candidate.position] =
        acc[candidate.organization._id].positions[candidate.position] || [];
      acc[candidate.organization._id].positions[candidate.position].push(
        formattedCandidate
      );
      return acc;
    }, {});

    // Fetch top 3 candidates per position within each organization
    const topCandidatesByOrganization = {};
    for (const orgId in candidatesByOrganization) {
      topCandidatesByOrganization[orgId] = {
        orgID: orgId,
        orgTitle: candidatesByOrganization[orgId].orgTitle,
        positions: {},
      };
      const positions = candidatesByOrganization[orgId].positions;
      for (const position in positions) {
        const candidates = positions[position];
        const topCandidates = candidates
          .sort((a, b) => b.voteCounts - a.voteCounts)
          .slice(0, 3);
        topCandidatesByOrganization[orgId].positions[position] = topCandidates;
      }
    }

    // Format data for candidatesByOrganization
    const candidatesData = Object.values(candidatesByOrganization).map(
      ({ orgID, orgTitle, positions }) => ({
        orgID,
        orgTitle,
        candidates: Object.entries(positions).map(([position, candidates]) => ({
          position,
          candidates,
        })),
      })
    );

    // Format data for topCandidatesByOrganization
    const topCandidatesData = Object.values(topCandidatesByOrganization).map(
      ({ orgID, orgTitle, positions }) => ({
        orgID,
        orgTitle,
        candidates: Object.entries(positions).map(([position, candidates]) => ({
          position,
          candidates,
        })),
      })
    );

    // Respond with the formatted candidates info grouped by organization
    res.json({
      candidatesByOrganization: candidatesData,
      topCandidatesByOrganization: topCandidatesData,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching candidates info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
