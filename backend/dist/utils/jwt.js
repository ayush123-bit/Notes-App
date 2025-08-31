"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
// src/utils/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = __importDefault(require("../config/env.js"));
const signJwt = (payload, expiresIn) => {
    const exp = (expiresIn ??
        env_js_1.default.JWT_EXPIRES_IN);
    // build options without forcing undefined
    const options = {};
    if (exp !== undefined) {
        options.expiresIn = exp;
    }
    return jsonwebtoken_1.default.sign(payload, env_js_1.default.JWT_SECRET, options);
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_js_1.default.JWT_SECRET);
    }
    catch {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
