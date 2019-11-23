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
const app = express()
const events = []

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

      type Event {
        _id: String!,
        name: String!,
        description: String!,
        eventPrice: Float!,
        createdAt: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(event: EventInput): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    // Resolvers for the query and mutation
    rootValue: {
      events() {
        return events
      },
      async createEvent({ event: { name, description, eventPrice } }) {
        try {
          const event = new Event({
            name,
            description,
            eventPrice
          })
          await event.save()
          events.push(event)
          return event
        } catch (err) {
          console.log(err)
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
