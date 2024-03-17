import express from "express";
import {
  createVoter,
  markVoterAsVoted,
} from "../controllers/voters.controllers.js";

const router = express.Router();

// Route for creating a new voter
router.post("/voters", createVoter);

// Route for marking a voter as voted
router.put("/voters/:voterId/mark-voted", markVoterAsVoted);

export default router;
