// Auth Service
// src/services/auth.service.ts

import User from "../models/user.model.js";
import type { IUser } from "../models/user.model.js";

import { generateOtp, otpExpiryDate } from "../utils/otp.js";
import { sendOtpEmail } from "../utils/email.js";
import { signJwt } from "../utils/jwt.js";

export const requestOtp = async (email: string) => {
  // generate OTP, store in user doc (create if not exist)
  const otp = generateOtp(6);
  const otpExpires = otpExpiryDate(10);

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      email,
      provider: "email",
    } as Partial<IUser>);
  }

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  // send email (errors bubble up to controller)
  await sendOtpEmail(email, otp);

  return { message: "OTP sent" };
};

export const verifyOtpAndGetToken = async (email: string, otp: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found. Request OTP first.");

  if (!user.otp || !user.otpExpires) throw new Error("No OTP set. Request a new OTP.");

  if (new Date() > user.otpExpires) {
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    throw new Error("OTP expired. Request a new OTP.");
  }

  if (user.otp !== otp) throw new Error("Invalid OTP.");

  // OTP valid — clear otp fields and set provider as email
  user.otp = null;
  user.otpExpires = null;
  user.provider = "email";
if (!user.name) user.name = email.split("@")[0] as string;

  await user.save();

  // sign JWT
  const token = signJwt({ userId: user._id, email: user.email });

  return { token, user };
};

export const handleGoogleCallback = async (user: IUser) => {
  // user parameter is mongoose user object from passport strategy
  // sign JWT
  const token = signJwt({ userId: user._id, email: user.email });
  return { token, user };
};

export const getUserById = async (id: string) => {
  return User.findById(id).select("-otp -otpExpires");
};
