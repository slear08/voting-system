import Candidates from "../models/candidates.model.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { upload, storage } from "../middlewares/upload.middleware.js";

// Controller for getting all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidates.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting candidates by Organization ID
export const getCandidatesByOrganizationId = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const candidates = await Candidates.find({ organization: organizationId });
    res.json(candidates);
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
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

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

      const updatedCandidate = await Candidates.findByIdAndUpdate(
        id,
        { profile: downloadURL, ...req.body },
        { new: true }
      );

      if (!updatedCandidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      res.status(200).json({
        message: "Candidate updated successfully",
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a candidate
export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCandidate = await Candidates.findByIdAndDelete(id);
    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
