import express from "express";
import { createAdmin } from "../controllers/admin.controllers.js";
const router = express.Router();

// Route for creating a new admin
router.post("/admin", createAdmin);

export default router;
