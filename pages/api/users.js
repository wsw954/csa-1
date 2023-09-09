import dbConnect from "/utils/db";
import { User } from "/models/user";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { action, username, email } = req.query;

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

      default:
        res.status(400).json({ error: "Invalid request" });
        break;
    }
  } else {
    res.status(405).json({ error: "Method not allowed" }); // Handle methods other than GET
  }
}
