import { adminAuth } from "../../utils/firebaseAdmin";

export default async (req, res) => {
  try {
    const listUsersResult = await adminAuth.listUsers(10); // Fetches up to 10 users
    const users = listUsersResult.users.map((user) => ({
      uid: user.uid,
      email: user.email,
    }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
