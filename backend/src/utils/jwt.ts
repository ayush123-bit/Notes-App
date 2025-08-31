// src/utils/jwt.ts
import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../config/env.js";

export const signJwt = (payload: object, expiresIn?: string | number) => {
  const exp = (expiresIn ??
    env.JWT_EXPIRES_IN) as SignOptions["expiresIn"];

  // build options without forcing undefined
  const options: SignOptions = {};
  if (exp !== undefined) {
    options.expiresIn = exp;
  }

  return jwt.sign(payload, env.JWT_SECRET as string, options);
};

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET as string);
  } catch {
    return null;
  }
};
