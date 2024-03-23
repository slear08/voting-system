import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import passport from "passport";
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("access_token", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const logoutAdmin = (_, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const userDetails = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Successfully retrieved user details",
      user: req.user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User details not found",
    });
  }
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = passport.authenticate("google", {
  successRedirect: `${process.env.CLIENT_URL}/login/success`,
  failureRedirect: `${process.env.CLIENT_URL}/error`,
});

export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
};
