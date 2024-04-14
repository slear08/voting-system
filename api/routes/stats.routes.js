import express from "express";
import { GetStats } from "../controllers/stats.controller.js";

const router = express.Router();

router.get("/stats", GetStats);

export default router;
