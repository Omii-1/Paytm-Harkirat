const {JWT_SECRET} = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req , res , next) {
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(403).json({
      message: "Not found authorization header"
    })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(JWT_SECRET, token)
    if(decoded.userId) {
      req.userId = decoded.userId
      next()
    } else {
      return res.status(403).json({
        message: "Not able to decode token using jwt"
      })
    }
  } catch (error) {
    return res.status(403).json({
        message: `error: ${error}`
      })
  }
}

module.exports = {authMiddleware}