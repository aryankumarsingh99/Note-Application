const express = require("express");    // this is used to create a server
const bcrypt = require("bcrypt");           // this is used to hash the password
const User = require("../models/User");    // this is used to create a model
const jwt = require("jsonwebtoken");       // this is used to create a token
const router = express.Router();              // this is used to create a router
 


router.post("/signup", async (req, res) => {    // this is used to create a user
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" })
    }
    const hashPassword = await bcrypt.hash(password, 10)            //  this is used to hash the password

    const newUser = new User({ name, email, password: hashPassword })    // this is used to create a user

    await newUser.save();                 // this is used to save the user

    return res
      .status(200)               // this is used to return the user
      .json({ success: true, message: "Accounted Created Successfully" })     // this is used to return the user
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in Signup User" })             // this is used to return the user
  }
});
 

router.post("/login", async (req, res) => {                      // this is used to login
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email})          // this is used to find the user
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password)          // this is used to compare the password

    if (!checkPassword) {                             // this is used to compare the password
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id },  "secretkeynoteapp123@#", {             // this is used to create a token
      expiresIn: "5h"
    });

    return res
      .status(200)               //   this is used to return the user
      .json({
        success: true, token, user: {name: user.name},
        message: "Login Successfully"
      })
  } catch(error) {                                 // this is used to return the user
    return res
      .status(500)
      .json({ success: false, message: "Error in Login Serverr" });           // this is used to return the user
  }
})
 

module.exports = router;
