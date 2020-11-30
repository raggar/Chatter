import React from "react";
import App from "./App";
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { AuthProvider } from "./context/auth";

//connects to graphql server
const httpLink = createHttpLink({
	uri: "http://localhost:5000",
});

//used to add token to user's header
const authLink = setContext(() => {
	const token = localStorage.getItem("jwtToken");
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

//Create new apollo client (which can take children by default)
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default (
	<ApolloProvider client={client}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ApolloProvider>
);
