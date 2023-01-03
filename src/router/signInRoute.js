const express = require("express");
const users = require("../models/registerModel");
const bcrypt = require("bcrypt");
// const cors = require("cors");
require("dotenv").config(); // to access the secret key as "process.env.secret"
// const secret = "JWTAUTH";
const router = express.Router();
const jwt = require("jsonwebtoken");

// loging in the user by credentials
router.post("/", async (req, res) => {
  const { Phone, Email, Password } = req.body;
  try {
    let user = await users.findOne({
      $or: [{ Email: Email }, { Phone: Phone }],
    });
    if (!user) {
      return res
        .status(402)
        .json({ status: "Failed", Message: "Invalid Email or Phone" });
    }
    if (!Password) {
      return res
        .status(402)
        .json({ status: "Failed", Message: "Incorrect Password" });
    }

    // Load hash from your password DB.
    bcrypt.compare(Password, user.Password, async function (err, result) {
      // result == true
      if (err) {
        return res.status(403).json({ status: "Failed", message: err.message });
      }
      // jwt token
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user._id,
          },
          process.env.secret
        );
        res.cookie("laundrycart", token, {
          expires: new Date(Date.now() / 1000 + 60 * 60),
          httpOnly: true,
        });

        res
          .status(200)
          .json({ status: "Login Successfully", user, token: token });
      } else {
        return res
          .status(402)
          .json({ status: "Failed", Message: "Incorrect Password" });
      }
    });
  } catch (e) {
    res.status(403).json({ status: "Failed", Message: e.message });
  }
});

module.exports = router;
