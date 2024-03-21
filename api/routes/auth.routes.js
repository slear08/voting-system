import express from "express";
import {
  loginAdmin,
  logout,
  googleLogin,
  googleCallback,
  userDetails,
  logoutAdmin,
} from "../controllers/auth.controllers.js";

const router = express.Router();

// Route for creating a new admin
router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);

router.get("/login/success", userDetails);
router.get("/login/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/logout", logout);

export default router;
