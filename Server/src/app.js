import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import apiLimiter from "./middleware/apiRateLimiter.js";
import mongoSanitize from "express-mongo-sanitize"
import hpp from "hpp";


const app = express();

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Rate Limiting
app.use(apiLimiter);

// Parse JSON
app.use(express.json());

app.use(mongoSanitize());

app.use(hpp());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Compress Responses
app.use(compression());

// Logging
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School ERP Backend Running",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use(errorMiddleware);

export default app;