"use strict";
// Auth Service
// src/services/auth.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.handleGoogleCallback = exports.verifyOtpAndGetToken = exports.requestOtp = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const otp_js_1 = require("../utils/otp.js");
const email_js_1 = require("../utils/email.js");
const jwt_js_1 = require("../utils/jwt.js");
const requestOtp = async (email) => {
    // generate OTP, store in user doc (create if not exist)
    const otp = (0, otp_js_1.generateOtp)(6);
    const otpExpires = (0, otp_js_1.otpExpiryDate)(10);
    let user = await user_model_js_1.default.findOne({ email });
    if (!user) {
        user = new user_model_js_1.default({
            email,
            provider: "email",
        });
    }
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
    // send email (errors bubble up to controller)
    await (0, email_js_1.sendOtpEmail)(email, otp);
    return { message: "OTP sent" };
};
exports.requestOtp = requestOtp;
const verifyOtpAndGetToken = async (email, otp) => {
    const user = await user_model_js_1.default.findOne({ email });
    if (!user)
        throw new Error("User not found. Request OTP first.");
    if (!user.otp || !user.otpExpires)
        throw new Error("No OTP set. Request a new OTP.");
    if (new Date() > user.otpExpires) {
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        throw new Error("OTP expired. Request a new OTP.");
    }
    if (user.otp !== otp)
        throw new Error("Invalid OTP.");
    // OTP valid — clear otp fields and set provider as email
    user.otp = null;
    user.otpExpires = null;
    user.provider = "email";
    if (!user.name)
        user.name = email.split("@")[0];
    await user.save();
    // sign JWT
    const token = (0, jwt_js_1.signJwt)({ userId: user._id, email: user.email });
    return { token, user };
};
exports.verifyOtpAndGetToken = verifyOtpAndGetToken;
const handleGoogleCallback = async (user) => {
    // user parameter is mongoose user object from passport strategy
    // sign JWT
    const token = (0, jwt_js_1.signJwt)({ userId: user._id, email: user.email });
    return { token, user };
};
exports.handleGoogleCallback = handleGoogleCallback;
const getUserById = async (id) => {
    return user_model_js_1.default.findById(id).select("-otp -otpExpires");
};
exports.getUserById = getUserById;
