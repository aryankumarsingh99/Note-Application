const jwt = require("jsonwebtoken");   // 
const User = require("../models/User");

const middleware = async (req, res, next) => {  //  this is used to verify the token
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.stutus(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "secretkeynoteapp123@#");

    if (!decoded) {
      return res.status(401).json({ success: false, message: "wrong token" });
    }
    const user = await User.findById({ _id: decoded.id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const newUser = { name: user.name, id: user._id };
    console.log(newUser);
    
    req.user = newUser;
    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Please login" });
  }
};

module.export = middleware;
