const mongoose =require("mongoose")




const LaundryCart = new mongoose.Schema({
    producttypes :{
        type:String,
        require:true
    },
    quantity :{
      type:Number,
      require:true
    }, 
    washtype :{
        type:Boolean,
        require:true
    },
    price : {
        type:Number,
        require:true
    }
 })
 
 const orderdata =  mongoose.model("OrderData",LaundryCart)

  module.exports = orderdata;