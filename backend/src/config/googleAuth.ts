// src/config/googleAuth.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import env from "./env.js";
import User from "../models/user.model.js";
import type { IUser } from "../models/user.model.js";


/**
 * Passport Google Strategy
 * On success, we'll either find existing user or create new user with googleId
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(null, false, { message: "No email from Google" });

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName || "Google User",
            email,
            googleId: profile.id,
            provider: "google",
          } as Partial<IUser>);
        } else {
          // If user exists but doesn't have googleId, attach it (optional)
          if (!user.googleId) {
            user.googleId = profile.id;
            user.provider = "google";
            await user.save();
          }
        }
        return done(null, user);
      } catch (err) {
        console.log("Error in Google Strategy:", err);
      }
    }
  )
);

// Minimal serialize/deserialize (not used in JWT flow, but needed)
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
