const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const Event = require('./Event')
const Booking = require('./Booking')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: 'event' }],
    accessToken: String
  },
  { timestamps: true }
)

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const password = await hash(this.password, 10)
    this.password = password
    next()
  }
})

userSchema.methods = {
  toJSON: function() {
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
  },

  generateAccessToken: async function() {
    const user = this
    const accessToken = await sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24hr'
    })
    user.accessToken = accessToken
    await user.save()
    return accessToken
  }
}

userSchema.statics = {
  findByEmailAndPassword: async (email, password) => {
    try {
      const user = await User.findOne({ email })
      if (!user) throw new Error('Invalid Credentials')
      const matched = await compare(password, user.password)
      if (!matched) {
        user.accessToken = null
        user.save()
        throw new Error('Invalid Credentials')
      }
      return user
    } catch (err) {
      throw err
    }
  }
}

userSchema.pre('remove', async function (next) {
  const user = this.toObject()
  await Event.deleteMany({ user: user._id })
  await Booking.deleteMany({ user: user._id })
  next()
})

const User = model('user', userSchema)
module.exports = User
