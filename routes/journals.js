const express = require('express')
const router = express.Router();
const Journals = require("../models/journalModel");


//get all journels

router.get("/journals", async (req, res)=>{

    try {
        const journals = await Journals.find().sort({createdAt:-1});

       return res.status(200).json({
            success: true,
            journals
          });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

})


//get a journel
router.get("/journals/:id", async (req, res)=>{

    try {
        const journals = await Journals.findById(req.params.id);

       return res.status(200).json({
            success: true,
            journals
          });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

})


//create a journel
router.post("/journals", async (req, res)=>{
    try {
        const journals = await Journals.create(req.body);

        return res.status(201).json({
            success: true,
            journals
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
})



//update a journel
router.put("/journals/:id", async (req, res)=>{
    try{
        let journals = await Journals.findById(req.params.id);

        if (!journals) {
            return res.status(400).json({error: "journals not found"});
        }
      
        journals = await Journals.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
      
        return res.status(200).json({
          success: true,
          journals,
        });
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}
)


router.delete("/journals/:id",async function(req, res) {
    const journals = await Journals.findById(req.params.id);
    if (!journals) {
        return res.status(500).json({error: "journal not found"});
    }
  
    await journals.remove();
  
    res.status(200).json({
      success: true,
      message: "journal deleted successfully",
    });

});



module.exports = router
