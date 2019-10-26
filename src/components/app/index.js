import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
import { get } from 'lodash';

import SignInPage from '../../pages/sign-in';
import SignUpPage from '../../pages/sign-up';
import HomePage from '../../pages/homepage';
import Loading from '../loading';
import { withAuth } from '../../hoc/with-auth';
import './app.css';

const HomePageComponent = Loadable({
  loader: async () => withAuth(HomePage),
  loading: Loading
});

const SignInPageComponent = Loadable({
  loader: async () => SignInPage,
  loading: Loading
});

const SignUpPageComponent = Loadable({
  loader: async () => SignUpPage,
  loading: Loading
});

function App(props) {
  const { isProcessingSomething } = props;

  return (
    <>
      <Router>
        <Switch>
          <Route path="/sign-in" exact={true}>
            <SignInPageComponent />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpPageComponent />
          </Route>
          <Route path="/">
            <HomePageComponent />
          </Route>
        </Switch>
      </Router>
      {isProcessingSomething ? (
        <div className="processing-something">
          <Spin size="large" />
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = state => ({
  isProcessingSomething: get(state, ['commonReducer', 'isProcessingSomething'])
});

export default connect(
  mapStateToProps,
  null
)(App);
