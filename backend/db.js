const mongoose = require("mongoose")
const { lowercase, minLength, maxLength } = require("zod")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 15
  },
  password: {
    type:String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30
  }
})

const User = mongoose.model("User", userSchema)

module.exports = {User}