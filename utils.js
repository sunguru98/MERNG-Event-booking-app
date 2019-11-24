const User = require('./models/User')
const Event = require('./models/Event')

const getUser = async userId => {
  try {
    let user = await User.findById(userId)
    if (!user) throw 'Event does not exist'
    user = user.toObject()
    delete user.password
    return { ...user, events: getEvents.bind(this, user.events) }
  } catch (err) {
    throw err
  }
}

const getEvent = async eventId => {
  try {
    let event = await Event.findById(eventId)
    if (!event) return new Error('Event does not exist')
    return { ...event.toObject(), user: getUser.bind(this, event.user) }
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
  getUser,
  getEvent,
  getEvents
}
