const mongoose = require("mongoose");

const conncectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/note_app");  // this is used to connect to the database
        console.log("MongoDB connected");
    } catch (error) {
        console.error("error connecting to MongoDB:", error.message);
    }
}

module.exports = conncectToMongoDB;