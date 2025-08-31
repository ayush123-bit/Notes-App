// src/utils/email.ts
import nodemailer from "nodemailer";
import env from "../config/env.js";

// Configure transporter for Gmail (using App Passwords)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

// Function to send OTP emails
export const sendOtpEmail = async (to: string, otp: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Highway Delite" <${env.EMAIL_USER}>`,
      to,
      subject: "Your One-Time Password (OTP)",
      html: `
        <p>Dear User,</p>
        <p>We received a request to verify your identity. Please use the following One-Time Password (OTP) to proceed:</p>
        <h2 style="color: #2d6cdf; font-size: 24px; letter-spacing: 2px;">${otp}</h2>
        <p>This OTP will expire in <b>10 minutes</b>. Please do not share it with anyone for security reasons.</p>
        <p>If you did not request this, you can safely ignore this email.</p>
        <br/>
        <p>Best regards,<br/>Highway Delite</p>
      `,
    });

    console.log("OTP email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};
