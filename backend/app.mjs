import express from 'express';
import cors from 'cors';
import connectDB from './config/db.mjs';
import path from 'path';
import { fileURLToPath } from "url";
import bodyParser from "body-parser"; 
import loginRoutes from './routes/loginRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import saleRoutes from './routes/salesRoutes.mjs';
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/login',loginRoutes);
app.use('/products',productRoutes);
app.use('/sales',saleRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,"static")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"static","login.html"));
})
connectDB.connect((err)=>{
  if(err){
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
})
app.listen(3000,()=>{
  console.log("Server running on port 3000");
});




