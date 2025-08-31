"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Server Start 
// src/server.ts
const app_js_1 = __importDefault(require("./app.js"));
const env_js_1 = __importDefault(require("./config/env.js"));
const db_js_1 = require("./config/db.js");
const start = async () => {
    await (0, db_js_1.connectDB)();
    const port = Number(env_js_1.default.PORT);
    app_js_1.default.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};
start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
