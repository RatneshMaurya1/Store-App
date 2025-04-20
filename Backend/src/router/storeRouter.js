const express = require("express")
const Store = require("../models/store.schema")
const storeRouter = express.Router()


storeRouter.get("/stores",async (req,res) => {
    try {
        const stores = await Store.find({})
        if(stores.length === 0){
            return res.status(404).json({message:"No stores found"})
        }
        res.status(200).json(stores)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error",error:error.message})
    }
})


module.exports = storeRouter