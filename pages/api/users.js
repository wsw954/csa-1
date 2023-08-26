import dbConnect from "/utils/db";
import { User } from "/models/user";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const { action, username } = req.query;

    if (action === "check-username" && username) {
      // Check if username exists
      const user = await User.findOne({ username });
      if (user) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } else {
      res.status(400).json({ error: "Invalid request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" }); // Handle methods other than GET
  }
}
