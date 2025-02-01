import express from 'express';
const router = express.Router();
const users = {
  user : "admin",
  password : "password123"
};
router.post("/", (req, res) => {
  const { username, password } = req.body;

  try{
    if (username === users.user && password === users.password) {
      res.json({ success: true, message: "Login successful!" });
  } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}catch(error){
  res.json({message:"Server error"});
}
});

export default router;
