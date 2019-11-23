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

type Event {
  _id: String!,
  name: String!,
  description: String!,
  eventPrice: Float!,
  createdAt: String!,
  user: User! 
}

type User {
  _id: String!,
  name: String!,
  password: String,
  email: String!
  createdAt: String!
  events: [Event!]
}

type RootQuery {
  events: [Event!]!
}

type RootMutation {
  createEvent(event: EventInput): Event
  createUser(user: UserInput): User
}

schema {
  query: RootQuery
  mutation: RootMutation
}`)
