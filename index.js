const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");

//uses websockets to listen for new posts made
const pubsub = new PubSub();

//dont need to specify index since thats default file in a folder
const resolvers = require("./graphql/resolvers"); //contain logic for each query/mutation

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub }), //take request body and forward to context
});

mongoose
	.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to db");
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server is running at ${res.url}`);
	});
