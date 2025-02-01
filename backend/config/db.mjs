import mysql from 'mysql2';

const connectDB = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'InventoryDB'
});

export default connectDB;