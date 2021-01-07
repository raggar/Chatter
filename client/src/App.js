import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import * as Sentry from '@sentry/react';

import 'semantic-ui-css/semantic.min.css';
import './App.css'; // will override default styles from semantic css (since it's after)

import AuthRoute from './util/AuthRoute';
import PrivateRoute from './util/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import SinglePost from './pages/SinglePost';
import Join from './pages/Join';
import Chat from './pages/Chat';
import News from './pages/news'; 
import singleArticle from './pages/singleArticle'; 

const App = () => (
  <Router>
    <Container>
      <MenuBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/posts/:postId" component={SinglePost} />
      <Route exact path = "/news" component = {News}/>
      <Route exact path = "/singleArticle" component = {singleArticle}/>
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
    </Container>
    <PrivateRoute exact path="/join" component={Join} />
    <PrivateRoute exact path="/join/chat" component={Chat} />
  </Router>
);

export default Sentry.withProfiler(App);
