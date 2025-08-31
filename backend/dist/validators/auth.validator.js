"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerifyOtp = exports.validateRequestOtp = void 0;
// Auth Validator 
// src/validators/auth.validator.ts
// Simple validators returning error messages; controllers will use them.
const validateRequestOtp = (email) => {
    const errors = [];
    if (!email)
        errors.push("Email is required");
    else if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email))
        errors.push("Invalid email");
    return errors;
};
exports.validateRequestOtp = validateRequestOtp;
const validateVerifyOtp = (email, otp) => {
    const errors = [];
    if (!email)
        errors.push("Email is required");
    else if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email))
        errors.push("Invalid email");
    if (!otp)
        errors.push("OTP is required");
    else if (typeof otp !== "string" || !/^\d{4,8}$/.test(otp))
        errors.push("Invalid OTP format");
    return errors;
};
exports.validateVerifyOtp = validateVerifyOtp;
