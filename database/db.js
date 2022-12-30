const mongoose =require("mongoose")

mongoose.set("strictQuery",false)

const url = process.env.DATABASE_URL || 'mongodb://127.0.0.1/laundryCart';

const db = ()=>{
    return mongoose.connect(url).then(()=>{
        console.log("CONNECTED")
    }).catch((e)=>{
        console.log(e.message)
    })
    
}
module.exports=db;