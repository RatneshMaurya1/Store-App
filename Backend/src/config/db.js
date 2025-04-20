const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:"store"
        })
    } catch (error) {
        console.error("Error connecting to mongoDb",error)
        process.exit(1)
    }
}

module.exports = connectDB