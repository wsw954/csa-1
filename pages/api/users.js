import dbConnect from "/utils/db";
import { User } from "/models/user";
import { adminAuth } from "/utils/firebaseAdmin";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { action, username, email } = req.query;
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      // If the token is not provided, return an unauthorized error
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      // Verify the token using Firebase Admin SDK
      await adminAuth.verifyIdToken(token);
    } catch (error) {
      // If token verification fails, return an unauthorized error
      return res.status(401).json({ error: "Unauthorized" });
    }

    switch (action) {
      case "check-username":
        if (username) {
          const userByUsername = await User.findOne({ username });
          console.log("User by username:", userByUsername);
          res.json({ exists: Boolean(userByUsername) });
        } else {
          res.status(400).json({ error: "Username parameter is required" });
        }
        break;

      case "check-email":
        if (email) {
          try {
            const userByEmail = await User.findOne({ email });
            console.log("User by email:", userByEmail);
            res.json({ exists: Boolean(userByEmail) });
          } catch (error) {
            res
              .status(500)
              .json({ error: "Database query failed: " + error.message });
          }
        } else {
          res.status(400).json({ error: "Email parameter is required" });
        }
        break;
      case "get-userInfo":
        if (email) {
          try {
            const user = await User.findOne({ email }, "_id username"); // Retrieve only _id and username
            if (user) {
              res.json({ _id: user._id, username: user.username });
            } else {
              res.status(404).json({ error: "User not found" });
            }
          } catch (error) {
            res
              .status(500)
              .json({ error: "Database query failed: " + error.message });
          }
        } else {
          res.status(400).json({ error: "Email parameter is required" });
        }
        break;
      default:
        res.status(400).json({ error: "Invalid request" });
        break;
    }
  } else {
    res.status(405).json({ error: "Method not allowed" }); // Handle methods other than GET
  }
}
