const express = require("express");
const Note = require("../models/Note.js");
const middleware = require("../middleware/middleware.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");       // this is used to create a model
const router = express.Router();                // this is used to create a router
// console.log();

router.post("/add",async (req, res, next) => {     // this is used to add a note
  try {
    
    const token = req.headers.authorization.split(" ")[1];         // this is used to verify the token

    if (!token) {                            // this is used to verify the token
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "secretkeynoteapp123@#");                 // this is used to verify the token

    if (!decoded) {               // this is used to verify the token
      return res.status(401).json({ success: false, message: "wrong token" });
    }
    const user = await User.findById({ _id: decoded.id });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const newUser = { name: user.name, id: user._id };            // this is used to verify the token
    console.log(newUser);
    
    req.user = newUser;
    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Please login" });        // this is used to verify the token
  }
}, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();

    return res
      .status(200)
      .json({ success: true, message: "Note Created Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Adding Note" });
  }
});



module.exports = router;
