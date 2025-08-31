import api from "../api/axios";
import { IUser } from "../types";

export const requestOtp = async (email: string) => {
  const res = await api.post("/api/auth/otp/request", { email });
  return res.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await api.post("/api/auth/otp/verify", { email, otp });
  return res.data as { token: string; user: IUser };
};

export const getMe = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};

// For google sign-in, frontend just navigates to `${API_BASE}/api/auth/google`
