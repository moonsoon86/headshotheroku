const express=require("express");
const router = express.Router();

router.use("/", (req,res)=> {
    res.send('API Page')
});

module.exports=router;