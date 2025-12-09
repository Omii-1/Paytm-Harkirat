const express = require("express")

const router = express.Router()

const {signupBody, signinBody} = require("../zod")
const {User} = require("../db")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

router.post("/signup", async(req, res) => {
  const {success} = signupBody.safeParse(req.body)

  if(!success){
    return res.status(411).json({
      message: "Email already taken / Wrong inputs"
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
    })

    return res.status(200).json({
      message: "Signin successfully",
      token
    })
  }

  return res.status(411).json({
    message: "Error while logging in"
  })
})

module.exports = router