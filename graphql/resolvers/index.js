const Event = require('../../models/Event')
const User = require('../../models/User')

const getUser = async userId => {
  try {
    let user = await User.findById(userId)
    user = user.toObject()
    delete user.password
    return { ...user, events: getEvents(user.events) }
  } catch (err) {
    throw err
  }
}

const getEvents = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(e => ({
      ...e._doc,
      user: getUser.bind(this, e.user)
    }))
  } catch (err) {
    throw err
  }
}

module.exports = {
  async events() {
    const events = await Event.find({}).sort('-createdAt')
    return events.map(e => ({
      ...e._doc,
      user: getUser(e.user),
      createdAt: new Date(e.createdAt).toISOString()
    }))
  },

  async createEvent({ event: { name, description, eventPrice } }) {
    try {
      const event = new Event({
        name,
        description,
        eventPrice
      })
      event.user = '5dd92b7878d796931da7239a'
      await event.save()
      const user = await User.findById('5dd92b7878d796931da7239a')
      if (!user) throw 'User not found'
      user.events.push(event._id)
      await user.save()
      return {
        ...event.toObject(),
        user: getUser(event.user),
        createdAt: new Date(event.createdAt).toISOString()
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },

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
  }
}
