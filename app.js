const express = require("express");
const mongoose = require("mongoose");
const RegisterRoute = require("./src/router/registerRoute");
const SigninRoute = require("./src/router/signInRoute");
const bodyparser = require("body-parser");

const port = process.env.port || 9000 ;
const app = express();
var cors = require('cors') 
app.use(cors())
app.use(bodyparser.json());
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/LCUsers", (e) => {
  if (e) {
    console.log(e.message);
  }
  console.log("Connected to DB");
});


app.use("/user/register", RegisterRoute);
app.use("/user/signin", SigninRoute);


const auth = require('./src/authentication/auth')
const productList = require('./productList')
const orderRoute = require('./src/router/orderRoutes')
const productRoute = require('./src/router/productRoutes')


app.use(express.static('public'))

app.use('/api/v1/orders' ,auth, orderRoute)
app.use('/api/v1/product' , productRoute)

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});
app.listen(port, () => {
  console.log(`server is setup at port ${port}`);
});

productList()