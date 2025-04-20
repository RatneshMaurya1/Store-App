const express = require("express")
const router = express.Router()
const Cart = require("../models/cart.schema")


router.post("/cart/add", async (req, res) => {
    const { userId, productId, action } = req.body;

    if (!userId || !productId || action && !["increment", "decrement"].includes(action)) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const existingCartItem = await Cart.findOne({ userId, productId });

        if (existingCartItem) {
            if (action === "increment") {
                existingCartItem.quantity += 1;
            } else if (action === "decrement") {
                existingCartItem.quantity -= 1;
            }else{
                existingCartItem.quantity += 1
            }

            if (existingCartItem.quantity <= 0) {
                await Cart.deleteOne({ userId, productId });
                return res.status(200).json({ message: "Product removed from cart" });
            } else {
                await existingCartItem.save();
                return res.status(200).json({ message: "Cart updated", cart: existingCartItem });
            }
        } else {
                const newCartItem = new Cart({ userId, productId, quantity: 1 });
                await newCartItem.save();
                return res.status(201).json({ message: "Product added to cart", cart: newCartItem });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Error: ${error.message}` });
    }
});

router.get("/cart/:userId", async (req, res) => {
    const { userId } = req.params;
    if(!userId){
        return res.status(400).json({message:"User ID is required"})
    }
    try {
        const cartItems = await Cart.find({userId}).populate("productId")
        if (cartItems.length === 0){
            return res.status(404).json({message:"No items in cart"})
        }
        const totalPrice = cartItems.reduce((acc,item) => {
            return acc + (item.productId.price * item.quantity)
        },0)
        const itemsTotalPrice = cartItems.map((item) =>{
            return {
                _id:item.productId._id,
                name:item.productId.name,
                price:item.productId.price,
                quantity:item.quantity,
                totalPrice:item.productId.price * item.quantity,
                storeName:item.productId.storeName
            }
        })
        return res.status(200).json({message:"cart items",itemsTotalPrice,totalPrice})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:`Error: ${error.message}`})
    }
})

router.delete("/delete/cart/:userId", async (req,res) => {
    const {userId} = req.params

    if(!userId){
        return res.status(400).json({message:"User Id is required"})
    }
    try {
        const deletedCart = await Cart.deleteMany({userId})
        if(deletedCart.deletedCount === 0){
            return res.status(404).json({message:"No items in cart"})
        }
        return res.status(200).json({message:"All items removed from cart"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:`Error: ${error.message}`})
    }
})
module.exports = router