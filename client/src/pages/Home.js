import React, { useContext } from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);

  // query name is added to data property
  // CAREFUL: dont destructure data in useQuery (property might not exist by the time mutation is made)
  const { loading, data, networkStatus, refetch } = useQuery(
    FETCH_POSTS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      onError(err) {
        console.log('Login Error:', err);
      },
    }
  );

  if (networkStatus === NetworkStatus.refetch) {
    return <h1>Refetching posts...</h1>;
  }

  if (loading) {
    return <h1>Loading posts..</h1>;
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Transition.Group>
          {data &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} refetch={refetch} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
