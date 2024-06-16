import express from "express";
import {
  loginAdmin,
  logout,
  googleLogin,
  googleCallback,
  userDetails,
  logoutAdmin,
} from "../controllers/auth.controllers.js";
import {
  authMiddleware,
  authAdminMiddleware,
} from "../middlewares/auth.middleware.js";
import { ChangePassword } from "../controllers/change-password.controllers.js";

const router = express.Router();

// Route for creating a new admin
router.post("/login", loginAdmin);
router.post("/admin/logout", logoutAdmin);

router.get("/login/success", authMiddleware, userDetails);
router.get("/login/google", googleLogin);
router.get("/google/callback", googleCallback);
router.post("/logout", logout);
router.post("/change-password", authAdminMiddleware, ChangePassword);

export default router;
