const express = require("express");
const router = express.Router();

const orderModel = require("../models/orderSchema");

router.post("/", async (req, res) => {
  try {
    let orders = await orderModel.create({ user: req.user, ...req.body });

    res.json({
      status: "Success",
      orders,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let orders = await orderModel.find({ user: req.user });
    res.json({
      status: "Success",
      orders: orders,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.put("/:order_Id", async (req, res) => {
  try {
    let data = await orderModel.findOne({ orderId: req.params.order_Id });

    // console.log(data.user)
    // console.log(req.user)

    let order = await orderModel.updateOne(
      { orderId: req.params.order_Id },
      { $set: { status: "cancelled" } }
    );
    res.json({
      status: "Success",
      order,
    });
  } catch (e) {
    res.status(403).json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = router;
