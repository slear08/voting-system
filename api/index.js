import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/index.js";

// Import routes
import candidateRoutes from "./routes/candidates.routes.js";
import organizationRoutes from "./routes/organization.routes.js";
import voterRoutes from "./routes/voters.routes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 6000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use routes
app.use(candidateRoutes);
app.use(organizationRoutes);
app.use(voterRoutes);

app.listen(PORT, () => console.log(`Server listening on ${PORT} 💻`));
