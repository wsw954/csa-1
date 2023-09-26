import dbConnect from "/utils/db";
import { User } from "/models/user";
import rateLimit from "express-rate-limit";
import { adminAuth } from "/utils/firebaseAdmin";

// Define rate limit middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  keyGenerator: function (req) {
    // Use the X-Forwarded-For header to get the IP address
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  },
});

export default async function handler(req, res) {
  await dbConnect();
  // Apply rate limiting
  await new Promise((resolve, reject) => {
    limiter(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });

  // Extract query parameters
  const { action, username, email } = req.query;

  if (req.method === "GET") {
    switch (action) {
      case "check-username":
        if (!username)
          return res.status(400).json({ error: "Missing username parameter" });
        const userByUsername = await User.findOne({ username });
        if (userByUsername)
          return res.status(409).json({ error: "Username already exists" });
        break;
      case "check-email":
        if (!email)
          return res.status(400).json({ error: "Missing email parameter" });
        const userByEmail = await User.findOne({ email });
        if (userByEmail)
          return res.status(409).json({ error: "Email already exists" });
        break;
      case "get-userInfo":
        // Extract the ID token from the Authorization header
        const authHeader = req.headers.authorization || "";
        const match = authHeader.match(/Bearer (.+)/);

        if (!match) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const idToken = match[1];

        try {
          // Verify the ID token using adminAuth
          await adminAuth.verifyIdToken(idToken);

          // Token is valid, continue to retrieve user information
          if (!email)
            return res.status(400).json({ error: "Missing email parameter" });
          const user = await User.findOne({ email }, "firstName _id");
          if (!user) return res.status(404).json({ error: "User not found" });
          return res
            .status(200)
            .json({ firstName: user.firstName, _id: user._id });
        } catch (error) {
          // Token verification failed, respond with unauthorized status code
          return res.status(401).json({ error: "Unauthorized" });
        }
      default:
        return res.status(400).json({ error: "Invalid action" });
    }
    // Return success response if username/email is available or if user info is retrieved
    return res.status(200).json({ message: "Available" });
  } else {
    return res.status(405).json({ error: "Method not allowed" }); // Handle methods other than GET
  }
}
