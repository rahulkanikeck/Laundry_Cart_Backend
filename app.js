const express = require("express");
const mongoose = require("mongoose");
const RegisterRoute = require("./src/router/registerRoute");
const SigninRoute = require("./src/router/signInRoute");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const secret = "JWTAUTH";
const port = process.env.port || 8080;
const app = express();
app.use(bodyparser.json());
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/LCUsers", (e) => {
  if (e) {
    console.log(e.message);
  }
  console.log("Connected to DB");
});
// verify a token symmetric
// app.use("/user/register", (req, res, next) => {
//   if (req.headers.authorization) {
//   }
//   const token = req.headers.authorization?.split("Bearer ")[1];

//   jwt.verify(token, secret, function (err, decoded) {
//     if (err) {
//       return res
//         .status(403)
//         .json({ status: "Invalid Token", message: err.message });
//     }
//   });
//   req.user = decoded.data;
// });

app.use("/user/register", RegisterRoute);
app.use("/user/signin", SigninRoute);
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});
app.listen(port, () => {
  console.log(`server is setup at port ${port}`);
});
