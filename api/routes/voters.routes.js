import express from "express";
import { createVoter, createVote } from "../controllers/voters.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Route for creating a new voter
router.post("/voters", createVoter);

// Route for marking a voter as voted
router.post("/voters/vote-candidate", authMiddleware, createVote);

export default router;
