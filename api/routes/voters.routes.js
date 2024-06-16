import express from "express";
import {
  createVoter,
  createVote,
  getAllVoters,
  updateVoterOrganization,
} from "../controllers/voters.controllers.js";
import {
  authMiddleware,
  authAdminMiddleware,
} from "../middlewares/auth.middleware.js";
const router = express.Router();

// Route for creating a new voter
router.post("/voters", createVoter);
router.get("/voters", getAllVoters);
// Route for marking a voter as voted
router.post("/voters/vote-candidate", createVote);
//Route for updating organization
router.post(
  "/voters/organization/:id",
  authAdminMiddleware,
  updateVoterOrganization
);

export default router;
