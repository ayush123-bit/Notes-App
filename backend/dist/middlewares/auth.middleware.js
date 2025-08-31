"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jwt_js_1 = require("../utils/jwt.js");
const jwtAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ error: "Authorization header missing" });
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer")
            return res.status(401).json({ error: "Invalid Authorization header" });
        const token = parts[1];
        if (!token)
            return res.status(401).json({ error: "Token missing" });
        const payload = (0, jwt_js_1.verifyJwt)(token);
        if (!payload)
            return res.status(401).json({ error: "Invalid or expired token" });
        req.user = payload;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.jwtAuth = jwtAuth;
