import mysql from 'mysql2';

const connectDB = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'Pratheeksh@729',
  database:'InventoryDB'
});

export default connectDB;