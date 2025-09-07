require("dotenv").config()
const express = require("express");
const cors = require("cors");
const { validationUser, signupValidation, loginValidation } = require("./zod");
const { User, Create, Todo } = require("./db");
const jwt = require("jsonwebtoken");

const  auth  = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cors());
const JWT_SCERET = process.env.JWT_SECRET;

app.post("/signup", async (req, res) => {
  const { userName, email, firstName, lastName, password } = req.body;
  const signupParsepayLoad = signupValidation.safeParse(req.body);
  if (!signupParsepayLoad.success) {
    return res.status(411).json({
      message: "Invalid format",
    });
  }
  const newUser = await Create.findOne({ email: email });
  if (newUser) {
    return res.status(411).json({
      message: "Email already exist,try new one",
    });
  }
  const todo = await Create.create({
   userName,email,firstName,lastName,password
  })
 

  const token = jwt.sign({ email: email }, JWT_SCERET);
  
  return res.json({
    message: "Sucessfully created",
    token,
  });
});
app.get("/todos", auth, async (req, res) => {
  const user = await Create.findOne({ email: req.email });
  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }
  const todos = await Todo.find({ userId: user._id }).sort({ createdAt: -1 });
  return res.json(todos);
});

app.post("/todos", auth, async (req, res) => {
  const validateParse = validationUser.safeParse(req.body);
  console.log(validateParse);

  if (!validateParse.success) {
    return res.status(411).json({
      message: "Inavalid data",
    });
  }
  const user = await Create.findOne({email:req.email})
  console.log(user);
  
  if(!user){
    return res.status(401).json({
      message:"User not found"
    })
  }

  const todo = await Todo.create({
    title: req.body.title,
    userId: user._id,
  });
  

  return res.json(todo);
});

app.delete("/todos/:id",auth, async (req, res) => {
  const user = await Create.findOne({email:req.email});
  if(!user){
    return res.status(401).json({
      message:"User not found"
    })
  }

  const todo=await Todo.findOneAndDelete({ _id: req.params.id,userId: user._id,});
  if(!todo){
    return res.status(404).json({
      message:"Todo not found"
    })
  }
  res.json({ success: true });
});
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const signinValidation = loginValidation.safeParse(req.body);
  console.log(signinValidation);
  
  if (!signinValidation.success) {
    return res.status(411).json({
      message: "Invalid Format",
    });
  }
  const user = await Create.findOne({ email: email });
  console.log(user);

  if (!user) {
    return res.status(411).json({
      message: "No exists email , create one",
    });
  }
  if (user.password !== password) {
    console.log(user.password);
    console.log(password);

    return res.status(411).json({
      message: "Incorrect password",
    });
  }

  const token = jwt.sign({ id:user._id,email: email }, JWT_SCERET,{expiresIn:"1h"});
  return res.status(200).json({
    message: "Signin Suceesfully",
    token,
  });
});
app.get("/find", async (req, res) => {
  const user = await User.find({});
  console.log(user);

  if (user.length==0) {
    return res.status(411).json({
      message: "User",
    });
  }
  return res.json({
    user,
  });
});

app.listen(3000);
