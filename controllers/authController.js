
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

exports.signup = async (req, res, next) => {
  try{
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "Signup successfully",
      data: {
        user: newUser,
      },
    });
  } catch(err){
    return res.status(400).json({
        status: "signUp fail",
        message: err
    })
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1) check if email and password are exit
  if (!email || !password) {
    return res.status(400).json({
        status: "login fail",
        message: "Please provide email and password!"
    })
  }

  // 2) check if user is exist && password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
        status: "login fail",
        message: "Invalid email or password"
    })
  }

  // 3) if everything ok, send token to client
  const token = signToken(user._id);
  return res.status(200).json({
    status: "Login successfully",
    token,
  });
};

 


