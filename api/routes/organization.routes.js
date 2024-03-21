import express from "express";
import {
  getAllOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganizationById,
} from "../controllers/organizations.controllers.js";
import { authAdminMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route for getting all organizations
router.get("/organizations", getAllOrganizations);

//Route for get by id of organizations
router.get("/organizations/:id", getOrganizationById);

// Route for creating a new organization
router.post("/organizations", authAdminMiddleware, createOrganization);

// Route for updating an organization
router.put("/organizations/:id", authAdminMiddleware, updateOrganization);

// Route for deleting an organization
router.delete("/organizations/:id", authAdminMiddleware, deleteOrganization);

export default router;
