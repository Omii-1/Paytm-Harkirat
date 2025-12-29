const express = require("express")
const mongoose = require("mongoose")
const rootRouter = require("./routes/index")
const cors = require("cors")
const {DB_URL} = require("./config")

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use("/api/v1", rootRouter)

const port = 3000

mongoose.connect(DB_URL)
  .then(() => console.log("Connected to mongoose"))
  .catch(err => console.log("MongoDB connection fail"))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNkMzkzYzJhM2UxYTY1YThhYWRiZWYiLCJpYXQiOjE3NjU2MjAwMjh9.wvXMRa1DuEXuGlR78ApMRHSawmcpOM4qWruIgSOrMqg