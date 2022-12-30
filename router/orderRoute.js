const express = require("express")
const router = express.Router()
const order = require("../models/OrdersSchema")
//! This is for the read the data -- (READ -- GET Method)
router.get("/",async(req,res)=>{
    const Order = await order.find(req.body)
    try{
     res.status(200).json({status:"orderCreated sucessfully",Order})
    }
    catch(e){
        res.status(403).json({status:"orderCreation failed",message:e.message})
    }
})
//! This is for the read the data -- (CREATE -- POST Method)
router.post("/",async(req,res) =>{
    const Order = await order.create(req.body)
    try{
     res.status(200).json({status:"orderCreated sucessfully",Order})
    }
    catch(e){
        res.status(403).json({status:"orderCreation failed",message:e.message})
    }


})


module.exports = router;