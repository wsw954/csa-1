// import dbConnect from "/utils/db";
// import { Buyer } from "/models/user";
// import { adminAuth } from "/utils/firebaseAdmin";

// export default async function handler(req, res) {
//   await dbConnect();

//   // const {
//   //   query: { id },
//   // } = req;
//   const token = req.headers.authorization?.split("Bearer ")[1];

//   if (!token) {
//     // If the token is not provided, return an unauthorized error
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
//   if (req.method === "GET") {
//     try {
//       console.log(token);
//       const buyer = await Buyer.findById(id);
//       if (!buyer) return res.status(404).json({ error: "Buyer not found." });
//       res.status(200).json(buyer);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch buyer." });
//     }
//   } else if (req.method === "PATCH") {
//     const updates = req.body;

//     try {
//       const updatedBuyer = await Buyer.findByIdAndUpdate(id, updates, {
//         new: true,
//       });
//       if (!updatedBuyer)
//         return res.status(404).json({ error: "Buyer not found." });
//       res.status(200).json(updatedBuyer);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to update buyer." });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed." });
//   }
// }

//pages/api/buyers/index.js
import dbConnect from "/utils/db";
import { Buyer } from "/models/user";
import { adminAuth } from "/utils/firebaseAdmin";

export default async function handler(req, res) {
  await dbConnect();
  // Get the ID token from the Authorization header
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    // If the token is not provided, return an unauthorized error
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the ID token using adminAuth
    const decodedToken = await adminAuth.verifyIdToken(token);

    // If verification is successful, you can access the user's UID
    const uid = decodedToken.uid;
    console.log(uid);
    // Continue with your route logic, e.g., fetching user data, performing database operations, etc.
    switch (req.method) {
      case "GET":
        try {
          const buyers = await Buyer.findOne({ firebaseUID: uid });
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
  } catch (error) {
    // If token verification fails, return an unauthorized error
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
}
