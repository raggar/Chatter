import React from 'react';
import { Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../util/useForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

export default function PostForm(props) {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
      props.refetch();
    },
    onError(err) {
      return err;
    },
  });

  function createPostCallback() {
    createPost();
  }

  if (error) {
    return `Error: ${error}`;
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post: </h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={!!error}
          />
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;
