import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../../containers/layout/signed-in-layout';
import Home from './home';
import PlayWithComputer from './play-with-computer';
import Fighting from './fighting';
import Profile from './profile';

class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          {/* <Route path="/play-with-computer" exact={true}>
            <PlayWithComputer />
          </Route> */}
          {/* <Route path="/fighting" exact={true}>
            <Fighting />
          </Route> */}
          <Route path="/profile" exact={true}>
            <Profile />
          </Route>
        </Switch>
      </Layout>
    );
  }
}

export default HomePage;
