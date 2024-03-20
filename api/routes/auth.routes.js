import express from "express";
import { login, logout } from "../controllers/auth.controllers.js";
const router = express.Router();

// Route for creating a new admin
router.post("/login", login);
// Route for logging out
router.post("/logout", logout);

export default router;
