const express =require('express')
const app =express()

const dotenv =require('dotenv')
dotenv.config()

var cors = require('cors')
app.use(cors())

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port =process.env.PORT || 3000

const DataBase=require('./database/db')

const auth = require('./authentication/auth')
const productList = require('./productList')
const orderRoute = require('./routes/orderRoutes')
const productRoute = require('./routes/productRoutes')


app.use(express.static('public'))

app.use('/api/v1/orders' ,auth, orderRoute)
app.use('/api/v1/product' , productRoute)

app.listen(port,async ()=>{
    await DataBase()
    console.log(`Server is live at port => ${port}`)
})

productList()