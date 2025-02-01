import express from 'express';
import connectDB from '../config/db.mjs';

const router = express.Router();

router.get('/',(req,res)=>{
  connectDB.query("SELECT * FROM Sales",(err,results)=>{
    if (err) {
      console.error("Error fetching sales: ", err);
      return res.status(500).json({ success: false, message: "Error fetching sales" });
  }
  return res.json({ success: true, data: results });
  })
});

export default router;