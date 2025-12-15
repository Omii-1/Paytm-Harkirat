const express = require("express")
const mongoose = require("mongoose")
const { Account } = require("../db")
const { authMiddleware } = require("../middleware")

const router = express.Router()

router.get("/balance", authMiddleware, async(req , res) => {
  const userId = req.userId

  const account = await Account.findOne({user: userId})
  console.log(account);

  if(!account) {
    return res.status(400).json({
      message: "Account not found"
    })
  }

  return res.status(200).json({
    message: "balance fetch successfuly",
    balance: account.balance
  })

})

router.post("/transfer", authMiddleware, async(req, res) => {

  const session = await mongoose.startSession()

  session.startTransaction()
  const {to, amount} = req.body

  const fromUser = await Account.findOne({user: req.userId}).session(session)
  const toUser = await Account.findOne({user: to}).session(session)
  
  if(fromUser.balance < amount) {
    session.abortTransaction()
    return res.status(400).json({
      message: "Insufficient balance"
    })
  }

  if(!toUser) {
    session.abortTransaction()
    return res.status(400).json({
      message: "Invalid account"
    })
  }

  await Account.updateOne({user: req.userId}, {
    $inc: {
      balance: -amount
    }
  }).session(session)

  await Account.updateOne({user: to}, {
    $inc: {
      balance: amount
    }
  }).session(session)

  session.commitTransaction()
  return res.status(200).json({
    message: "Transfer successful"
  })
})

module.exports = router