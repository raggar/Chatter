const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers'); // contain logic for each query/mutation (don't need to specify /index at the end since its default file)
const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs'); // where each query/mutation is defined

const pubsub = new PubSub(); // uses websockets to listen for new posts made

// instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // passed to every resolver that executes for a particular operation and enables resolvers to share helpful context
  context: ({ req }) => ({ req, pubsub }), // take request body and forward to context
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to db');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
