const Event = require('../../models/Event')
const User = require('../../models/User')

const { getUser, getEvents } = require('../../utils')

module.exports = {
  async events() {
    const events = await Event.find({}).sort('-createdAt')
    return events.map(e => ({
      ...e._doc,
      user: getUser.bind(this, e.user),
      createdAt: new Date(e.createdAt).toISOString()
    }))
  },

  async createEvent(
    { event: { name, description, eventPrice } },
    { isAuthenticated, user }
  ) {
    try {
      if (!isAuthenticated) throw new Error('Incorrect Credentials')
      const event = new Event({
        name,
        description,
        eventPrice
      })
      event.user = user._id
      await event.save()
      user.events.push(event._id)
      await user.save()
      return {
        ...event.toObject(),
        user: { ...user.toObject(), events: getEvents.bind(this, user.events) },
        createdAt: new Date(event.createdAt).toISOString()
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
