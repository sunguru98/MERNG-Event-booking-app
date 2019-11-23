const express = require('express')
// Parser for graphQl to point the incoming request towards respected resolvers
const graphQlHttp = require('express-graphql')
// Used to define the schemas (mutations and resolvers)
const { buildSchema } = require('graphql')

const app = express()
app.use(express.json())
app.use(
  '/graphql',
  graphQlHttp({
    schema: buildSchema(`
      type RootQuery {
        events: [String!]!
      }

      type RootMutation {
        createEvent(name: String): String
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    // Resolvers for the query and mutation
    rootValue: {
      events() {
        return ['Event1', 'Event2', 'Event3']
      },
      createEvent({ name }) {
        const newEvent = name
        return newEvent
      }
    },
    graphiql: true
  })
) // Graphql has only one endpoint not like multiple in REST API

app.listen(9998, () => {
  console.log(`Server running on PORT 9998`)
})
