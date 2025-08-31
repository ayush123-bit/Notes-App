
import mongoose from "mongoose";
import env from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      // options if any
    } as mongoose.ConnectOptions);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
