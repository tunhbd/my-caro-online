import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeLayout from '../../containers/layout/signed-in-layout';
import PlayLayout from '../../containers/layout/play-layout';
import Home from './home';
import PlayWithComputer from './play-with-computer';
import Fighting from './fighting';
import Profile from './profile';

class HomePage extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <HomeLayout>
            <Home />
          </HomeLayout>
        </Route>
        <Route path="/profile" exact>
          <HomeLayout>
            <Profile />
          </HomeLayout>
        </Route>
        <Route path="/play-with-computer" exact>
          <PlayLayout>
            <PlayWithComputer />
          </PlayLayout>
        </Route>
        <Route path="/fighting" exact>
          <PlayLayout>
            <Fighting />
          </PlayLayout>
        </Route>
      </Switch>
    );
  }
}

export default HomePage;
