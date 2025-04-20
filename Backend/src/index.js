const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 5000
const app = express()


app.use(cors())

app.use(express.json())

app.use("/api",require("./router/storeRouter"))
app.use("/api",require("./router/productRouter"))
app.use("/api",require("./router/cartRouter"))
app.use("/api",require("./router/orderRouter"))

app.get("/",(req,res) => {
    res.send("API is running...")
})

connectDB()
.then(() => {
    console.log("MongoDB connected successfully...")
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    })
}).catch((err) => {
    console.log("mongodb connection failed" + err)
})