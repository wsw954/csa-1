import dbConnect from "/utils/db";
import { Buyer } from "/models/user";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const buyers = await Buyer.find({});
        res.status(200).json(buyers);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch buyers." });
      }
      break;

    case "POST":
      const buyerData = req.body;
      console.log(buyerData);
      // Remove the password from the buyerData object
      delete buyerData.password;
      try {
        const newBuyer = new Buyer(buyerData);
        await newBuyer.save();
        res.status(201).json(newBuyer);
      } catch (error) {
        console.error("Error Line 26:", error);
        res.status(500).json({ error: "Failed to create buyer." });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed." });
      break;
  }
}
