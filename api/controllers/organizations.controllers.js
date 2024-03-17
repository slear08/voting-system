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
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    upload.single("file")(req, res, async (err) => {
      try {
        const { file } = req;
        const { title, info } = req.body;

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

      const updatedOrganization = await Organization.findByIdAndUpdate(id, {
        picture: downloadURL,
        ...req.body,
      });

      if (!updatedOrganization) {
        return res.status(404).json({ message: "Organization not found" });
      }

      res.json(updatedOrganization);
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
