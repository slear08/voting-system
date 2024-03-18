import express from "express";
import {
  getAllCandidates,
  getCandidatesByOrganizationId,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidates.controllers.js";

const router = express.Router();

// Route for getting all candidates
router.get("/candidates", getAllCandidates);

// Route for getting candidates by Organization ID
router.get("/candidates/:organizationId", getCandidatesByOrganizationId);

// Route for creating a new candidate
router.post("/candidates", createCandidate);

// Route for updating a candidate
router.put("/candidates/:id", updateCandidate);

// Route for deleting a candidate
router.delete("/candidates/:id", deleteCandidate);

export default router;
