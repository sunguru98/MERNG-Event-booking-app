const Booking = require('../../models/Booking')
const { getEvent, getUser, getEvents } = require('../../utils')

module.exports = {
  async bookings(args, { isAuthenticated }) {
    try {
      if (!isAuthenticated) throw new Error('Incorrect Credentials')
      const bookings = await Booking.find({}).sort('-createdAt')
      return bookings.map(b => ({
        _id: b._id,
        event: getEvent.bind(this, b.event),
        user: getUser.bind(this, b.user)
      }))
    } catch (err) {
      throw err
    }
  },

  async bookEvent({ eventId }, { isAuthenticated, user }) {
    try {
      if (!isAuthenticated) throw new Error('Incorrect Credentials')
      const event = await getEvent(eventId)
      if (!event) throw new Error('Event not found')
      const booking = new Booking({
        event: eventId,
        user: user._id
      })
      await booking.save()
      return {
        ...booking.toObject(),
        event,
        user: { ...user.toObject(), events: getEvents.bind(this, user.events) }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  async cancelBooking({ bookingId }, { isAuthenticated }) {
    try {
      if (!isAuthenticated) throw new Error('Incorrect Credentials')
      const booking = await Booking.findByIdAndDelete(bookingId)
      if (!booking) throw new Error('Booking not found')
      const event = await getEvent(booking.event)
      return event
    } catch (err) {
      throw err
    }
  }
}
