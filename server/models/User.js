const  mongoose = require("mongoose");    // this is used to connect to the database
const bcrypt = require("bcrypt");               // this is used to hash the password

const UserSchema = new mongoose.Schema({      // this is used to create a schema
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);   // this is for creating a model

module.exports = User;