const express = require("express");
const users = require("../models/registerModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post(
  "/",
  // username must be an email
  body("Email").isEmail(),
  // password must be at least 6 chars long
  body("Password")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password Length must be between 6-16 characters")
    .isAlphanumeric()
    .withMessage("Password must be Alphanumeric"),
  body("Phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Not A valid Phone Number"),
  async (req, res) => {
    const { Name, Email, Phone, State, District, Address, Pincode, Password } =
      req.body;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // To check The user is existing or not
      let user = await users.findOne({
        $or: [{ Email: Email }, { Phone: Phone }],
      });
      // console.log(user);
      if (user) {
        return res.json({ status: "Failed", Message: "User Already Exist" });
      }
      bcrypt.hash(Password, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          return res
            .status(403)
            .json({ status: "Failed", Message: err.message });
        }
        // To create the new user
        user = await users.create({
          Name: Name,
          Email: Email,
          Phone: Phone,
          State: State,
          District: District,
          Address: Address,
          Pincode: Pincode,
          Password: hash,
        });
        user
          .save()
          .then(() => {
            console.log("Created User Has been Saved");
          })
          .catch((e) => {
            console.log(e.message);
          });

        // console.log(user);
        res.status(200).json({ Message: "Registration Successfull", user });
      });
    } catch (e) {
      res.status(403).json({ status: "Failed", Message: e.message });
    }
  }
);

router.delete("/:id", async (req, res) => {
  const user = await users.deleteOne({ _id: req.params.id });
  try {
    res.status(200).json({ status: "User Deleted" });
  } catch (e) {
    res.status(403).json({ status: "Failed", Message: e.message });
  }
});
module.exports = router;
