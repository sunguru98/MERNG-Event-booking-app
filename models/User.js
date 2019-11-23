const { Schema, model } = require('mongoose')
const { hash } = require('bcryptjs')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
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
  }
}

const User = model('user', userSchema)
module.exports = User
