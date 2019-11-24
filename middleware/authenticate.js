const User = require('../models/User')
const { verify } = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization')
    if (!accessToken) {
      req.isAuthenticated = false
      return next()
    }
    const payload = await verify(
      accessToken.replace('Bearer ', ''),
      process.env.JWT_SECRET
    )
    if (!payload) {
      req.isAuthenticated = false
      return next()
    }
    const _id = payload._id
    const user = await User.findOne({
      _id,
      accessToken: accessToken.replace('Bearer ', '')
    })
      .select('-password')
      .select('-__v')
    if (!user) {
      req.isAuthenticated = false
      return next()
    }
    req.user = user
    req.isAuthenticated = true
    return next()
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = authenticate
