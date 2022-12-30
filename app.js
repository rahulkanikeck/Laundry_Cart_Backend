const express = require("express")
const database = require("./Database/db")

const bodyparser = require("body-parser")
const orderRouter = require("./router/orderRoute")
const port = 3000
const app = express()
app.use(express.json())
app.use(bodyparser.json())
app.use("/orders",orderRouter)
app.listen(port,async()=>{
    await database()
    console.log(`connected to port ${port}` )
})

