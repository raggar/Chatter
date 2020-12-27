const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const resolvers = require('./graphql/resolvers'); // contain logic for each query/mutation (don't need to specify /index at the end since its default file)
const typeDefs = require('./graphql/typeDefs'); // where each query/mutation is defined

const pubsub = new PubSub(); // uses websockets to listen for new posts

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // passed to every resolver that executes for a particular operation and enables resolvers to share helpful context
  context: ({ req }) => ({ req, pubsub }), // take request body and forward to context
});

const PORT = process.env.port || 5000;

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database successfully :)');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
