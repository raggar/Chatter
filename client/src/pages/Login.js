import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

export default function Login(props) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: "",
		password: "",
	});

	//loginUser is a function that can be used to execute the mutation

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		// when loginUser is called and if mutation is successfully executed
		update(_, { data: { login: userData } }) {
			context.login(userData);
			props.history.push("/");
		},
		variables: values,
		//if there is an error with the mutation we will popular the errors state
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.exception);
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<div className="form-container">
			{/* Login Form Body */}
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Login</h1>
				{/* Username */}
				<Form.Input
					label="Username"
					placeholder="Username..."
					name="username"
					type="text"
					value={values.username}
					onChange={onChange}
					error={errors.username ? true : false}
				/>
				{/* Password */}
				<Form.Input
					label="Password"
					placeholder="Password..."
					type="password"
					name="password"
					value={values.password}
					onChange={onChange}
					error={errors.password ? true : false}
				/>
				{/* Submit Button */}
				<Button type="submit" primary>
					Login
				</Button>
			</Form>
			{/* Any Error Messages */}
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

const LOGIN_USER = gql`
	# first line defines "login" schema
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;
