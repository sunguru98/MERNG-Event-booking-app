// Used to define the schemas (mutations and resolvers)
const { buildSchema } = require('graphql')

module.exports = buildSchema(`
input EventInput {
  name: String!,
  description: String!,
  eventPrice: Float!
}

input UserInput {
  name: String!
  email: String!
  password: String!
}

type Booking {
  _id: ID!,
  user: User!,
  event: Event!,
  createdAt: String!
}

type Event {
  _id: ID!,
  name: String!,
  description: String!,
  eventPrice: Float!,
  createdAt: String!,
  user: User! 
}

type User {
  _id: ID!,
  name: String!,
  password: String,
  accessToken: String
  email: String!
  createdAt: String!
  events: [Event!]
}

type Auth {
  user: User!,
  accessToken: String!,
  expiresIn: String!
}

type RootQuery {
  events: [Event!]!
  bookings: [Booking!]!
}

type RootMutation {
  createEvent(event: EventInput): Event
  createUser(user: UserInput): Auth
  loginUser(email: String!, password: String!): Auth
  bookEvent(eventId: ID!): Booking
  cancelBooking(bookingId: ID!): Event
}

schema {
  query: RootQuery
  mutation: RootMutation
}`)
