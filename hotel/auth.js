const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user model and roles
const User = require("../models/User");
const roles = ["guest", "admin"];

// validation middleware using joi
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");

// register route
router.post("/register", registerValidation, async (req, res) => {
  // check if user already exists
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send("User already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role || "guest", // default role is guest
  });

  try {
    const savedUser = await user.save();
    res.send({ userId: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// login route
router.post("/login", loginValidation, async (req, res) => {
  // check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  // create and assign a token
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;
