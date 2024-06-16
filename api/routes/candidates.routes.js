import express from "express";
import {
  getAllCandidates,
  getCandidatesByOrganizationId,
  createCandidate,
  updateCandidate,
  deleteCandidates,
  getCandidateById,
  getResult,
} from "../controllers/candidates.controllers.js";
import { authAdminMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route for getting all candidates
router.get("/candidates", getAllCandidates);

// Route for getting candidates by ID
router.get("/candidates/:id", getCandidateById);

// Route for getting results of votes
router.get("/candidates/org/result", getResult);

// Route for getting candidates by Organization ID
router.get("/candidates/org/:organizationId", getCandidatesByOrganizationId);

// Route for creating a new candidate
router.post("/candidates", authAdminMiddleware, createCandidate);

// Route for updating a candidate
router.put("/candidates/:id", authAdminMiddleware, updateCandidate);

// Route for deleting a candidate
router.delete("/candidates", authAdminMiddleware, deleteCandidates);

export default router;
