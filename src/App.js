import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Header from './components/Header/Header.js'
import HomePage from './components/HomePage/HomePage.js'

import { useSelector, useDispatch } from 'react-redux';

import { postsGet } from 'actions/postsActions';
import { AuthPage, Feed, AddPostPage } from 'pages';
import { AuthCheck } from 'components';

function App() {
  const dispatch = useDispatch();
  const postsStore = useSelector(state => state.postsStore);

  useEffect(() => {
    if (!postsStore.isInit) {
      dispatch(postsGet());
    }
  }, [dispatch, postsStore.isInit]);

  return (
    <Router>
      <Header></Header>
      <AuthCheck>
        <Switch>
        <Route exact path="/auth" component={AuthPage} />

        <Route exact path="/new" component={AddPostPage} />
        <Route exact path="/homepage" component={HomePage} />

        <Route exact path="/feed" component={Feed} />
        <Redirect to="/feed" />
        </Switch>
      </AuthCheck>
    </Router>
  );
}

export default App;
