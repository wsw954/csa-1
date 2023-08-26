import dbConnect from "/utils/db";
import { Buyer } from "/models/user";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const buyers = await Buyer.find({});
      res.status(200).json(buyers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch buyers." });
    }
  } else if (req.method === "POST") {
    const buyerData = req.body;

    try {
      const newBuyer = new Buyer(buyerData);
      await newBuyer.save();
      res.status(201).json(newBuyer);
    } catch (error) {
      res.status(500).json({ error: "Failed to create buyer." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
