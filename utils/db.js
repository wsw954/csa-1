import mongoose from "mongoose";

async function dbConnect() {
  // Check if we're already connected to the database
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
}

export default dbConnect;
