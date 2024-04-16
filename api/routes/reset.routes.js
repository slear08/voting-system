import express from "express";
import { ResetSystem } from "../controllers/reset.controllers.js";

const router = express.Router();

router.post("/reset-system", ResetSystem);

export default router;
