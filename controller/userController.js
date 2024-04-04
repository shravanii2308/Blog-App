const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
// register users
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    // email validation || existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).semnd({
        success: false,
        message: "User alredy exists",
      });
    }
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New user created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in register controller",
      success: false,
      error,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.status(200).send({
      userCount: this.getAllUsers.length,
      success: true,
      message: "All users data",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all users controller",
      error,
    });
  }
};

// login users
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide valid email or password",
      });
    }
    // email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }
    // password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalide username or passdword",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login Succesfully here",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login controller",
      error,
    });
  }
};
