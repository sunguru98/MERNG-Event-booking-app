const express = require('express')
// Dotenv configure
require('dotenv').config()
// Database
require('./db')
// Parser for graphQl to point the incoming request towards respected resolvers
const graphQlHttp = require('express-graphql')
// Used to define the schemas (mutations and resolvers)
const { buildSchema } = require('graphql')

const Event = require('./models/Event')
const User = require('./models/User')

const app = express()

app.use(express.json())
app.use(
  '/graphql',
  graphQlHttp({
    schema: buildSchema(`
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
        user: String!      
      }

      type User {
        _id: String!,
        name: String!,
        password: String,
        email: String!
        createdAt: String!
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
      }
    `),
    // Resolvers for the query and mutation
    rootValue: {
      async events() {
        const events = await Event.find({}).sort('-createdAt')
        return events
      },

      async createEvent({ event: { name, description, eventPrice } }) {
        try {
          const event = new Event({
            name,
            description,
            eventPrice
          })
          event.user = '5dd92b7878d796931da7239a'
          await event.save()
          const user = await User.findById('5dd92b7878d796931da7239a')
          user.events.push(event._id)
          await user.save()
          return event
        } catch (err) {
          console.log(err)
          throw err
        }
      },

      async createUser({ user: { email, password, name } }) {
        try {
          let user = await User.findOne({ email })
          if (user) throw 'User already exists'
          user = new User({ name, email, password })
          await user.save()
          user = user.toObject()
          delete user.password
          return user
        } catch (err) {
          console.error(err)
          throw err
        }
      }
    },
    graphiql: true
  })
) // Graphql has only one endpoint not like multiple in REST API

app.listen(9998, () => {
  console.log(`Server running on PORT 9998`)
})
