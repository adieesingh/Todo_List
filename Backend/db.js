const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todo_pratice");

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
});
const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const createSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, reuired: true },
});

const signinSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Create = mongoose.model("Create", createSchema);
const Login = mongoose.model("Login", signinSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  User,
  Create,
  Login,
  Todo,
};
