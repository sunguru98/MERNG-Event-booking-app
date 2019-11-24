const Booking = require('../../models/Booking')
const { getEvent, getUser } = require('../../utils')

module.exports = {
  async bookings() {
    try {
      const bookings = await Booking.find({}).sort('-createdAt')
      return bookings.map(b => ({
        ...b._doc,
        event: getEvent(b.event),
        user: getUser(b.user)
      }))
    } catch (err) {
      throw err
    }
  },

  async bookEvent({ eventId }) {
    try {
      const event = getEvent(eventId)
      const booking = new Booking({
        event: eventId,
        user: '5dd92b7878d796931da7239a'
      })
      await booking.save()
      return {
        ...booking.toObject(),
        event,
        user: getUser('5dd92b7878d796931da7239a')
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  async cancelBooking({ bookingId }) {
    try {
      const booking = await Booking.findByIdAndDelete(bookingId)
      if (!booking) throw new Error('Booking not found')
      const event = await getEvent(booking.event)
      return event
    } catch (err) {
      throw err
    }
  }
}
