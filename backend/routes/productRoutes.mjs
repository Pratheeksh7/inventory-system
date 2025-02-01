import connectDB from "../config/db.mjs";
import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
   connectDB.query("SELECT * FROM Product", (err, results) => {
      if (err) {
          console.error("Error fetching products: ", err);
          return res.status(500).json({ success: false, message: "Error fetching products" });
      }
      return res.json({ success: true, data: results });
  });
});

export default router;