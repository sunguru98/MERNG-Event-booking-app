const { Schema, model } = require('mongoose')

const eventSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    eventPrice: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'user ' }
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

const Event = model('event', eventSchema)
module.exports = Event
