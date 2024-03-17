import express from "express";
import {
  getAllOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organizations.controllers.js";

const router = express.Router();

// Route for getting all organizations
router.get("/organizations", getAllOrganizations);

// Route for creating a new organization
router.post("/organizations", createOrganization);

// Route for updating an organization
router.put("/organizations/:id", updateOrganization);

// Route for deleting an organization
router.delete("/organizations/:id", deleteOrganization);

export default router;
