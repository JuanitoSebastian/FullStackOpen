const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')
const config = require('./utils/config')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
  }, {
    server: httpServer,
    path: '/graphql'
  })

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            }
          }
        }
      }
    ],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), config.JWT_SECRET
        )
        const currentUser = await User
          .findById(decodedToken.id)

        return { currentUser }
      }
    }
  })

  await server.start()
  server.applyMiddleware({ app })

  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  )
}

const toExport = {
  startApolloServer
}

module.exports = toExport