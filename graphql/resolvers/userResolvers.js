const User = require('../../models/User')
const { getEvents } = require('../../utils')

module.exports = {
  async createUser({ user: { email, password, name } }) {
    try {
      let user = await User.findOne({ email })
      if (user) throw 'User already exists'
      user = new User({ name, email, password })
      const accessToken = await user.generateAccessToken()
      user = user.toObject()
      return {
        user: {
          ...user,
          createdAt: new Date(user.createdAt).toISOString(),
          events: getEvents.bind(this, user.events),
          password: null
        },
        accessToken: `Bearer ${accessToken}`,
        expiresIn: '24hr'
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  async loginUser({ email, password }) {
    try {
      const user = await User.findByEmailAndPassword(email, password)
      if (!user) throw new Error('Invalid credentials')
      const accessToken = await user.generateAccessToken()
      return {
        user: {
          ...user.toObject(),
          events: getEvents.bind(this, user.events),
          password: null
        },
        accessToken: `Bearer ${accessToken}`,
        expiresIn: '24hr'
      }
    } catch (err) {
      throw new Error(err)
    }
  },

  async logoutUser(args, { isAuthenticated, user }) {
    try {
      if (!isAuthenticated || !user) throw new Error('Incorrect Credentials')
      user.accessToken = null
      await user.save()
      return 'Logged out successfully'
    } catch (err) {
      throw err
    }
  }
}
