"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpExpiryDate = exports.generateOtp = void 0;
// OTP Utils 
// src/utils/otp.ts
const generateOtp = (length = 6) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
};
exports.generateOtp = generateOtp;
const otpExpiryDate = (minutes = 10) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + minutes);
    return d;
};
exports.otpExpiryDate = otpExpiryDate;
