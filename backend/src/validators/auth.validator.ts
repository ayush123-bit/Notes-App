// Auth Validator 
// src/validators/auth.validator.ts
// Simple validators returning error messages; controllers will use them.
export const validateRequestOtp = (email: any) => {
  const errors: string[] = [];
  if (!email) errors.push("Email is required");
  else if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email");
  return errors;
};

export const validateVerifyOtp = (email: any, otp: any) => {
  const errors: string[] = [];
  if (!email) errors.push("Email is required");
  else if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email");
  if (!otp) errors.push("OTP is required");
  else if (typeof otp !== "string" || !/^\d{4,8}$/.test(otp)) errors.push("Invalid OTP format");
  return errors;
};
