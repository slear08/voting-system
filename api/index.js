import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/index.js";
import "./configs/passport.js";
import passport from "passport";
import cookieSession from "cookie-session";

// Import routes
import candidateRoutes from "./routes/candidates.routes.js";
import authRoutes from "./routes/auth.routes.js";
import organizationRoutes from "./routes/organization.routes.js";
import voterRoutes from "./routes/voters.routes.js";
import adminRoute from "./routes/admin.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import resetRoutes from "./routes/reset.routes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 6000;

const app = express();
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["voting-system"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use("/api", candidateRoutes);
app.use("/api", adminRoute);
app.use("/api/auth", authRoutes);
app.use("/api", organizationRoutes);
app.use("/api", voterRoutes);
app.use("/api", statsRoutes);
app.use("/api", resetRoutes);

app.get("/", (req, res) => res.send("SERVER IS READY!"));

app.listen(PORT, () => console.log(`Server listening on ${PORT} 💻`));
