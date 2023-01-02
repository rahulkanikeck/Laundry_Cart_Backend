const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    user : {type: ObjectId , ref:"userCollection"},
    orderId: { type: String, required: true },
    // orderTimeDate: { type: String, required: true },
    storeLocation: { type: String, required: true },
    city: { type: String, required: true },
    storePhone: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Ready to Pickup" },
    cart: []
}, { timestamps: true })

const model = mongoose.model("orders", orderSchema);

module.exports = model