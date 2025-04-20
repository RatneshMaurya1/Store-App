const express = require("express");
const router = express.Router();
const Order = require("../models/order.schems");

router.post("/order", async (req, res) => {
  try {
    const { userId, userName, items, total } = req.body;
    if (!userId || !userName || !items || !total) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newOrder = new Order({
      userId,
      userName,
      items,
      total,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({message:"Order placed successfully.",savedOrder});
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/order/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
