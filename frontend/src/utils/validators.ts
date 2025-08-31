export const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);
export const isValidOtp = (otp: string) => /^\d{4,8}$/.test(otp);
