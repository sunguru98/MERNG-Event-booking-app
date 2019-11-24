const userResolvers = require('./userResolvers')
const bookingResolvers = require('./bookingResolvers')
const eventResolvers = require('./eventResolvers')

module.exports = {
  ...userResolvers,
  ...bookingResolvers,
  ...eventResolvers
}