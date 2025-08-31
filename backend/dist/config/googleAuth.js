"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/googleAuth.ts
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_js_1 = __importDefault(require("./env.js"));
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
/**
 * Passport Google Strategy
 * On success, we'll either find existing user or create new user with googleId
 */
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_js_1.default.GOOGLE_CLIENT_ID,
    clientSecret: env_js_1.default.GOOGLE_CLIENT_SECRET,
    callbackURL: env_js_1.default.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email)
            return done(null, false, { message: "No email from Google" });
        let user = await user_model_js_1.default.findOne({ email });
        if (!user) {
            user = await user_model_js_1.default.create({
                name: profile.displayName || "Google User",
                email,
                googleId: profile.id,
                provider: "google",
            });
        }
        else {
            // If user exists but doesn't have googleId, attach it (optional)
            if (!user.googleId) {
                user.googleId = profile.id;
                user.provider = "google";
                await user.save();
            }
        }
        return done(null, user);
    }
    catch (err) {
        console.log("Error in Google Strategy:", err);
    }
}));
// Minimal serialize/deserialize (not used in JWT flow, but needed)
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(async (id, done) => {
    const user = await user_model_js_1.default.findById(id);
    done(null, user);
});
exports.default = passport_1.default;
