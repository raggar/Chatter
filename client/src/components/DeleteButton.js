import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import MyPopup from '../util/MyPopup';

function DeleteButton(props) {
  const { postId, commentId, refetch } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation, { error }] = useMutation(mutation, {
    variables: {
      postId,
      commentId,
    },
    update(proxy, result) {
      setConfirmOpen(false);
      if (!commentId) {
        // TODO double check if "proxy" or "client" is used
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        });
      }
      // if (error) {
      //   console.error(error);
      // }
      refetch();
      const location = useLocation();
      console.log(location.pathname);
      // if path is single post page, then redirect to home page after refetching (if not means we are already on home page)
    },

    onError(err) {
      console.log(error);
      return err;
    },
  });

  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen} // Boolean decides to show confirm box or not
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
