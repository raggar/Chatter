const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");

//dont need to specify index since thats default file in a folder
const resolvers = require("./graphql/resolvers"); //contain logic for each query/mutation

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }), //take request body and forward to context
});

mongoose
	.connect(MONGODB, { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to db");
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server is running at ${res.url}`);
	});
