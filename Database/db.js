const mongoose =require("mongoose")

mongoose.set("strictQuery",false)

const db = ()=>{
    return mongoose.connect("mongodb://127.0.0.1/laundryCart").then(()=>{
        
        console.log("CONNECTED")
    }).catch((e)=>{
        console.log(e.message)
    })
    
}


module.exports=db;