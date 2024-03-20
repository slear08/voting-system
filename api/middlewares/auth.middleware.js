import jwt from "jsonwebtoken";
import Voters from "../models/voters.model.js";
import Admin from "../models/admin.model.js";

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.access_token) {
    // Get token from cookie
    token = req.cookies.token;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Not authorized",
        });
      }

      req.user = await Voters.findById(decoded.userId).select("-password");
      next();
    });
  }

  if (!token) {
    res.status(401).json({
      message: "No token Not authorized",
    });
  }
};

const authAdminMiddleware = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.access_token) {
    token = req.cookies.token;

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
