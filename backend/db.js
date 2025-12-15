const mongoose = require("mongoose")

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

const acountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const User = mongoose.model("User", userSchema)
const Account = mongoose.model("Account", acountSchema)

module.exports = {User, Account}