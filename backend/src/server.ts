// Server Start 
// src/server.ts
import app from "./app.js";
import env from "./config/env.js";
import { connectDB } from "./config/db.js";

const start = async () => {
  await connectDB();

  const port = Number(env.PORT);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
