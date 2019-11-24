const User = require('../../models/User')
const { getEvents } = require('../../utils')

module.exports = {
  async createUser({ user: { email, password, name } }) {
    try {
      let user = await User.findOne({ email })
      if (user) throw 'User already exists'
      user = new User({ name, email, password })
      await user.save()
      user = user.toObject()
      delete user.password
      return { ...user, createdAt: new Date(user.createdAt).toISOString() }
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
          events: getEvents(user.events),
          password: null
        },
        accessToken: `Bearer ${accessToken}`,
        expiresIn: '24hr'
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
