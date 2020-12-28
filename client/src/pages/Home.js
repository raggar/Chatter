import React, { useContext } from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  // grab current user
  const { user } = useContext(AuthContext);

  // query name is added to data property
  // CAREFUL: dont destructure data in useQuery (property might not exist by the time mutation is made)
  const { loading, error, data, refetch, networkStatus } = useQuery(
    FETCH_POSTS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === NetworkStatus.refetch) {
    return <h1>Refetching posts...</h1>;
  }

  if (loading) {
    return <h1>Loading posts..</h1>;
  }

  if (error) {
    return `Error ${error.message}`;
  }

  if (user) {
    console.log('Current logged in user:', user.token);
  } else {
    console.log('There is no logged in user');
  }

  console.table(data.getPosts);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm refetch={refetch} />
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
