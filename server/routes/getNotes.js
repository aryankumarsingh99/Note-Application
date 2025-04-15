const { Router } = require("express");          //  It is used for creating a router 
const Note = require("../models/Note");            // this is used to create a model

const router = Router();         // this is used to create a router

router.get("/", async (req, res) => {            // this is used to get the notes
  try {
    const notes = await Note.find( )          // this is used to find the notes
    return res.status(200).json({ success: true, notes });         //  this is used to return the notes
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "can retrive notes" });
  }
})

router.put("/:id", async (req, res) => {            // this is used to update the notes
  try{
    const {id} =  req.params;
    console.log(id);
    
    const updateNote = await Note.findByIdAndUpdate(id, req.body)       // this is used to update the notes
    return res.status(200).json({ success: true, updateNote })           // this is used to return the notes
  } catch (error){
    return res.status(500).json({success: false, message: "cant update notes "})
  }
})


router.delete("/:id", async (req, res) => {               // this is used to delete the notes
  try{
    const {id} =  req.params;                            // this is used to delete the notes
    const updateNote = await Note.findByIdAndDelete(id )
    return res.status(200).json({success: true, updateNote })
  } catch (error){
    return res.status(500).json({success: false, message: "cant delete notes "})           // this is used to return the notes
  }
})

module.exports = router;
