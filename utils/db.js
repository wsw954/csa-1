import mongoose from "mongoose";
// const mongoose = require("mongoose");
const connection = {};

async function dbConnect() {
  // Check if we're already connected to the database
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    // Connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
}

export default dbConnect;
