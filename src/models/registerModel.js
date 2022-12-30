const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: true, unique: true },
  State: { type: String, required: true },
  District: { type: String, required: true },
  Address: { type: String, required: true },
  Pincode: { type: Number, required: true },
  Password: { type: String, required: true },
});
const UserCollection = mongoose.model("UserCollection", UserSchema);
module.exports = UserCollection;
