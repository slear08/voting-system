import Organization from "../models/organizations.model.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { upload, storage } from "../middlewares/upload.middleware.js";

export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrganization = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      try {
        const { file } = req;
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        const { title, info, content } = req.body;

        const storageRef = ref(
          storage,
          `voting-system/organization-profile/${file.originalname}`
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

        const newOrganization = new Organization({
          picture: downloadURL,
          title,
          info,
          content,
        });

        const savedOrganization = await newOrganization.save();

        res.status(201).json(savedOrganization);
      } catch (error) {
        return res.status(500).json({
          message: "Error saving",
          error: error.message,
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error handling file upload", message: error.message });
  }
};

export const updateOrganization = async (req, res) => {
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
            `voting-system/organization-profile/${file.originalname}`
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

          // If there's a file uploaded, update the 'picture' field in the updateData
          updateData.picture = downloadURL;
        }
        const updatedOrganization = await Organization.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        if (!updatedOrganization) {
          return res.status(404).json({ message: "Organization not found" });
        }

        res.status(200).json({
          message: "Organization updated successfully",
        });
      } catch (error) {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrganization = await Organization.findByIdAndDelete(id);
    if (!deletedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
