// utils/db.js
import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }
console.log("MongoDB URI:", process.env.MONGODB_URI);
console.log("Test Variable:", process.env.TEST_VAR);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cached.conn = conn;
    cached.promise = conn;
  }

  return cached.promise;
}

export default connectDB;
