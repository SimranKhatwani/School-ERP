import dotenv from "dotenv";

dotenv.config();


const requiredEnvVariables = [
  "PORT",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
});

console.log("✅ Environment variables loaded successfully");