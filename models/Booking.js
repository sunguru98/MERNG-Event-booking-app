const { Schema, model } = require('mongoose')

const bookingSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: 'event' },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
  },
  { timestamps: true }
)

bookingSchema.methods = {
  toJSON: function () {
    const booking = this.toObject()
    delete booking.__v
    return booking
  }
}

const Booking = model('booking', bookingSchema)
module.exports = Booking
