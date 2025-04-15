const mongoose = require("mongoose");  // this is used to connect to the database

const NoteSchema = mongoose.Schema({   // this is used to create a schema
  title: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Note", NoteSchema);
 
