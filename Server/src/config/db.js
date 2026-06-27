const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("⚠️ MONGODB_URI not set. Skipping DB connection.");
      return;
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    // Don't exit the process here; allow the server to start and handle DB unavailability gracefully.
  }
};

module.exports = connectDB;