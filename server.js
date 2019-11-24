const express = require('express')
const authenticate = require('./middleware/authenticate')
// Dotenv configure
require('dotenv').config()
// Database
require('./db')
// require('./models/Event')
//   .deleteMany()
//   .then(() => console.log('Done'))
// require('./models/Booking')
//   .deleteMany()
//   .then(() => console.log('Done'))
// Parser for graphQl to point the incoming request towards respected resolvers
const graphQlHttp = require('express-graphql')
const schema = require('./graphql/schemas')
const rootValue = require('./graphql/resolvers')

const app = express()

app.use(express.json())
app.use(authenticate)
app.use(
  '/graphql',
  graphQlHttp({
    schema,
    // Resolvers for the query and mutation
    rootValue,
    graphiql: true
  })
) // Graphql has only one endpoint not like multiple in REST API

app.listen(9998, () => {
  console.log(`Server running on PORT 9998`)
})
