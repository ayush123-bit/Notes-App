"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express App 
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const notes_routes_js_1 = __importDefault(require("./routes/notes.routes.js"));
const error_middleware_js_1 = require("./middlewares/error.middleware.js");
const googleAuth_js_1 = __importDefault(require("./config/googleAuth.js"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use(googleAuth_js_1.default.initialize());
// Routes
app.use("/api/auth", auth_routes_js_1.default);
app.use("/api/notes", notes_routes_js_1.default);
// Basic health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
// Error handler (last)
app.use(error_middleware_js_1.errorHandler);
exports.default = app;
