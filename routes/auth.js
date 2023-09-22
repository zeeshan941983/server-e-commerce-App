const express =require("express");
const User=require("../models/user");
const authRouter= express.Router();
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const auth = require("../middlewares/auth");
// ////signup Api
// authRouter.post("/api/signup",async(req,res)=>{
//     //get data from client
//     // post that data in database
//     try{
//         const{name,email,password}  = req.body;
//         const existingUser=await User.findOne({email});
//         if(existingUser){
//            return res.status(400).json({
//                msg:"User with same email already exists!"
//            });
//         };
//       const hashPassword=  await bcryptjs.hash(password,8);
//         let user=new User({
//         email,
//         password:hashPassword,
//         name,
//         });
//         user =await user.save();
//         res.json(user);
//     } catch(e){
//        res.status(500).json({error:e.message});
//     }




// });
// //signin route
// authRouter.post("/api/signin",async(req, res)=>{
//     try {
//         const {email , password}=req.body;
//         const user=await User.findOne({email});
//         if(!user){
//             return res
//             .status(400)
//             .json({
//                 msg:"User with this email does not exist!"});
//         }
//         ///match password
//        const ismatch= await bcryptjs.compare(password,user.password);
//        if(!ismatch){
//         return res
//         .status(400)
//         .json({
//             msg:"Incorrect password!"});
//        }
//      const token=  jwt.sign({id:user._id},"passwordkey");
//      res.json({token,...user._doc});
//      //{
//         //token: "token"
// //name: "zeeshan"
// //email:"zeeshan@gmail.com"

//      //}
//     } catch (error) {
//         res.status(500).json({error:e.message});
        
//     }

// });
// //token valid

// authRouter.post("/tokenIsValid", async (req, res) => {
//     try {
//       const token = req.header("x-auth-token");
//       if (!token) return res.json(false);
//       const verified = jwt.verify(token, "passwordKey");
//       if (!verified) return res.json(false);
  
//       const user = await User.findById(verified.id);
//       if (!user) return res.json(false);
//       res.json(true);
//     } catch (e) {
//       res.status(500).json({ error: e.message });
//     }
//   });

// //get user data
// authRouter.get("/", auth, async (req, res) => {
//     const user = await User.findById(req.user);
//     res.json({ ...user._doc, token: req.token });
//   });
// module.exports=authRouter;

// SIGN UP
authRouter.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with same email already exists!" });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 8);
  
      let user = new User({
        email,
        password: hashedPassword,
        name,
      });
      user = await user.save();
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  // Sign In Route
  // Exercise
  authRouter.post("/api/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User with this email does not exist!" });
      }
  
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password." });
      }
  
      const token = jwt.sign({ id: user._id }, "passwordKey");
      res.json({ token, ...user._doc });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  authRouter.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
      const verified = jwt.verify(token, "passwordKey");
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      res.json(true);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  // get user data
  authRouter.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
  });
  
  module.exports = authRouter;
  