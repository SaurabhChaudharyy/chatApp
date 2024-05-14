const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");


const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password, name, picture } = req.body;
  if (!email || !password || !name) {
    res.status(400);
    res.json({
      message: "Required fields cannot be empty",
    });
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400).json({
      message: "User already exists",
      name: userExists.name,
      email: userExists.email,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    picture
  });
  if (user) {
    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.picture,
      token: generateToken(user._id),
    })
  }
  else {
    res.status(400).json({
      message: "Error in user creation",
    });
  }
});


const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "User name or password cannot be empty",
    })
  }

  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.picture,
      token: generateToken(user._id),
    })
  }

});

module.exports = { registerUser, authUser };
