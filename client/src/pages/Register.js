import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import useForm from '../util/useForm';

export default function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted(data) {
      context.login(data.register);
      props.history.push('/');
    },
    onError(err) {
      if (err.graphQLErrors[0]) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values,
  });

  // created since functions are recognized everywhere as opposed to constants
  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      {/* Register Form */}
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>

        {/* Username */}
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
          error={errors && errors.username ? true : false}
        />
        {/* Email */}
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          error={errors && errors.email ? true : false}
        />
        {/* Password */}
        <Form.Input
          label="Password"
          placeholder="Password..."
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors && errors.password ? true : false}
        />
        {/* Confirm Password */}
        <Form.Input
          label="Confirm Password"
          placeholder="ConfirmPassword"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors && errors.confirmPassword ? true : false}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {loading ? <p>Registering user...</p> : ''}
      {errors && Object.keys(errors).length > 0 && (
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
