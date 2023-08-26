import { connectToDatabase } from "/utils/db";
import { Buyer } from "/models/user";

export default async function handler(req, res) {
  await connectToDatabase();

  const {
    query: { id },
  } = req;

  if (req.method === "GET") {
    try {
      const buyer = await Buyer.findById(id);
      if (!buyer) return res.status(404).json({ error: "Buyer not found." });
      res.status(200).json(buyer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch buyer." });
    }
  } else if (req.method === "PATCH") {
    const updates = req.body;

    try {
      const updatedBuyer = await Buyer.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedBuyer)
        return res.status(404).json({ error: "Buyer not found." });
      res.status(200).json(updatedBuyer);
    } catch (error) {
      res.status(500).json({ error: "Failed to update buyer." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
