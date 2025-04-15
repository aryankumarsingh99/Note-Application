const cors = require("cors");          // this is used to connect to the database
const express = require("express");
const conncectToMongoDB = require("./db/db.js");         // this is used to connect to the database
const authRouter = require("./routes/auth.js");
const noteRouter = require("./routes/Note.js");             //  this is used to connect to the database

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);       // it pass the request to the router
app.use("/api/note", noteRouter);            //  it pass the request to the router
app.use("/api/get-note", require("./routes/getNotes.js"));

app.listen(5000, () => {           // this is used to connect to the database
  conncectToMongoDB();
  console.log("Server is running ");
});
