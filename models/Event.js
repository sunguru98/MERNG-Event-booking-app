const { Schema, model } = require('mongoose')
const Booking = require('./Booking')

const eventSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    eventPrice: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
  },
  { timestamps: true }
)

eventSchema.methods = {
  toJSON: function() {
    const event = this.toObject()
    delete event.__v
    return event
  }
}

eventSchema.pre('remove', async function(next) {
  await Booking.deleteMany({ event: this._id })
  next()
})

const Event = model('event', eventSchema)
module.exports = Event
