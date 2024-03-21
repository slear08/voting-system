import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Voters from "../models/voters.model.js";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Check if the user already exists in the database
        const existingUser = await Voters.findOne({ googleId: profile.id });

        if (existingUser) {
          // User already exists, return the existing user
          return cb(null, existingUser);
        } else {
          // User does not exist, create a new one
          const newUser = new Voters({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profile: profile.photos[0].value,
          });
          await newUser.save();
          // Return the newly created user
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Voters.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
