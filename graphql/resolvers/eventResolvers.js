const Event = require('../../models/Event')
const User = require('../../models/User')

const { getUser } = require('../../utils')

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
  }
}