import dns from "dns";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("⚠️ MONGODB_URI not set. Skipping DB connection.");
      return;
    }

    if (mongoUri.startsWith("mongodb+srv://")) {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      console.log("🔎 Using custom DNS servers for SRV lookup: 8.8.8.8, 1.1.1.1");
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      tls: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    if (error.code === "ECONNREFUSED" && error.syscall === "querySrv") {
      console.error(
        "➡️ DNS SRV lookup failed. Try using a non-SRV MongoDB URI or switch your DNS/network settings."
      );
    }
    // Don't exit the process here; allow the server to start and handle DB unavailability gracefully.
  }
};

export default connectDB;