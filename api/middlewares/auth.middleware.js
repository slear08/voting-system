import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const authAdminMiddleware = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.access_token) {
    token = req.cookies.access_token;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Not authorized",
        });
      }

      req.user = await Admin.findById(decoded.userId).select("-password");
      next();
    });
  }

  if (!token) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

export { authMiddleware, authAdminMiddleware };
