"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
// src/utils/email.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_js_1 = __importDefault(require("../config/env.js"));
// Configure transporter for Gmail (using App Passwords)
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
        user: env_js_1.default.EMAIL_USER,
        pass: env_js_1.default.EMAIL_PASS,
    },
});
// Function to send OTP emails
const sendOtpEmail = async (to, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"UCER Management" <${env_js_1.default.EMAIL_USER}>`,
            to,
            subject: "Your One-Time Password (OTP)",
            html: `
        <p>Dear User,</p>
        <p>We received a request to verify your identity. Please use the following One-Time Password (OTP) to proceed:</p>
        <h2 style="color: #2d6cdf; font-size: 24px; letter-spacing: 2px;">${otp}</h2>
        <p>This OTP will expire in <b>10 minutes</b>. Please do not share it with anyone for security reasons.</p>
        <p>If you did not request this, you can safely ignore this email.</p>
        <br/>
        <p>Best regards,<br/>UCER Management Team</p>
      `,
        });
        console.log("OTP email sent:", info.messageId);
        return info;
    }
    catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
};
exports.sendOtpEmail = sendOtpEmail;
