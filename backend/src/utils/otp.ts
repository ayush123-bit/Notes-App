// OTP Utils 
// src/utils/otp.ts
export const generateOtp = (length = 6): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

export const otpExpiryDate = (minutes = 10): Date => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + minutes);
  return d;
};
