
const mongoose = require("mongoose");
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_CONN, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log("mongodb connected");
  } catch (err) {
    console.error("mongodb connection error:", err);
    throw err;
  }
}

module.exports = connectDB;