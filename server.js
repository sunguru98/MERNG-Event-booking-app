const express = require('express')
// Database
require('./db')
// Parser for graphQl to point the incoming request towards respected resolvers
const graphQlHttp = require('express-graphql')
// Used to define the schemas (mutations and resolvers)
const { buildSchema } = require('graphql')
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
      createEvent({ event: { name, description, eventPrice } }) {
        const newEvent = {
          _id: Math.random().toString(),
          name,
          description,
          eventPrice,
          createdAt: new Date().toISOString()
        }
        events.push(newEvent)
        return newEvent
      }
    },
    graphiql: true
  })
) // Graphql has only one endpoint not like multiple in REST API

app.listen(9998, () => {
  console.log(`Server running on PORT 9998`)
})
