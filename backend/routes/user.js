const express = require("express")

const router = express.Router()

const {signupBody, signinBody, updateBody} = require("../zod")
const {authMiddleware} = require("../middleware")
const {User, Account} = require("../db")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

router.post("/signup", async(req, res) => {
  const {success, error} = signupBody.safeParse(req.body)

  if(!success){
    return res.status(411).json({
      message: "Email already taken / Wrong inputs",
      errors: error.errors
    })
  }

  const existingUser = await User.findOne({
    username: req.body.username
  })

  if(existingUser) {
    return res.status(411).json({
      message: "Emial already taken"
    })
  }

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  })

  
  const userId  = user._id
  
  const token = jwt.sign({
    userId
  }, JWT_SECRET)
  
  await Account.create({
    user: userId,
    balance: 1+ Math.random()* 1000
  })
  
  return res.status(200).json({
    message: "User created successfully",
    token
  })
})

router.post("/signin", async(req, res) => {
  const {success} = signinBody.safeParse(req.body)
  if(!success){
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs"
    })
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  })

  const userId = user._id

  if(user){
    const token = jwt.sign({
      userId
    }, JWT_SECRET)

    return res.status(200).json({
      message: "Signin successfully",
      token
    })
  }

  return res.status(411).json({
    message: "Error while logging in"
  })
})

router.put("/update", authMiddleware, async(req, res) => {
  const {success} = updateBody.safeParse(req.body)

  if(!success){
    return res.status(400).json({
      message: "Error while updating information"
    })
  }

  await User.updateOne({_id: req.userId}, req.body)

  return res.status(200).json({
    message: "User updated successfully"
  })
})

router.get("/bulk", async(req, res) => {
  const filter = req.query.filter
  const users = await User.find({
    $or: [{
      firstName: {
        "$regex": filter 
      }
    }, {
      lastName: {
        "$regex": filter
      }
    }]
  })

  return res.status(200).json({
    users: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  })

})

router.get("/getBalance", authMiddleware, async(req,res) => {
  const userId = req.userId

  const account = await Account.findOne({user: userId}).populate("user")

  return res.status(200).json({
    message: "User info fetch successfully",
    username: account.user.firstName,
    balance: account.balance
  })
})


module.exports = router