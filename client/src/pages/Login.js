import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation, useContext } from "@apollo/client";
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

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		// if mutation is successfully executed
		update(_, { data: { login: userData } }) {
			context.login(userData);
			props.history.push("/");
		},
		variables: values,
		//if there is an error
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
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Login</h1>
				<Form.Input
					label="Username"
					placeholder="Username..."
					name="username"
					type="text"
					value={values.username}
					onChange={onChange}
					error={errors.username ? true : false}
				/>
				<Form.Input
					label="Password"
					placeholder="Password..."
					type="password"
					name="password"
					value={values.password}
					onChange={onChange}
					error={errors.password ? true : false}
				/>
				<Button type="submit" primary>
					Login
				</Button>
			</Form>
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
