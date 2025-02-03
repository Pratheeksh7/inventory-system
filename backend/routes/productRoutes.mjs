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

router.post("/update-stock", (req, res) => {
    const { productId, action } = req.body;
    let sql = "";
    if (action === "increase") {
        sql = `UPDATE Product SET Units_instock = Units_instock + 1 WHERE Product_id = ?`;
    } else if (action === "decrease") {
        sql = `UPDATE Product SET Units_instock = Units_instock - 1 WHERE Product_id = ? `;
    } else {
        return res.status(400).json({ success: false, message: "Invalid action" });
    }

    connectDB.query(sql, [productId], (err, result) => {
        if (err) {
            console.error("Error updating stock:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        connectDB.query(`SELECT Units_instock FROM Product WHERE Product_id = ?`, [productId], (err, rows) => {
            if (err) {
                console.error("Error fetching updated stock:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }
            res.json({ success: true, newStock: rows[0].Units_instock });
        });
    });
});

router.post("/add", (req, res) => {
    const {Product_id, Product_Name, Category_id, Unit_price, Units_instock } = req.body;

    if (!Product_id || !Product_Name || !Category_id || !Unit_price || !Units_instock) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const sql = `INSERT INTO Product (Product_id,Product_Name, Category_id, Unit_price, Units_instock) VALUES (?,?, ?, ?, ?)`;
    connectDB.query(sql, [Product_id,Product_Name, Category_id, Unit_price, Units_instock], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        connectDB.query(`SELECT * FROM Product WHERE Product_id = ?`, [Product_id], (err, rows) => {
            if (err) {
                console.error("Error fetching new product:", err);
                return res.status(500).json({ success: false, message: "Error fetching new product" });
            }
            res.json({ success: true, newProduct: rows[0] });
        });
    });
});

router.delete('/delete/:id',async(req,res)=>{
    const productId = req.params.id;
    if (!productId || isNaN(productId)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }
    const sql = `DELETE FROM Product WHERE Product_id = ?`;
    connectDB.query(sql,[productId],(err,result)=>{
        if(err){
            console.error("Database error:",err);
            return res.status(500).json({success:false,message:"Database error"});
        }
        res.json({success:true});
    })
});

export default router;