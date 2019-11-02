import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spin, notification } from 'antd';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';

import SignIn from '../sign-in';
import SignUp from '../sign-up';
import HomePage from '../homepage';
import Loading from '../../commons/components/loading';
import { withAuth } from '../../hoc/with-auth';
import { commonActions } from '../../actions';
import './app.css';

const HomePageComponent = Loadable({
  loader: async () => withAuth(HomePage),
  loading: Loading
});

const SignInComponent = Loadable({
  loader: async () => SignIn,
  loading: Loading
});

const SignUpComponent = Loadable({
  loader: async () => SignUp,
  loading: Loading
});

function App(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/sign-in" exact={true}>
            <SignInComponent />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpComponent />
          </Route>
          <Route path="/">
            <HomePageComponent />
          </Route>
        </Switch>
      </Router>
      {/* {isProcessing ? (
        <div className="processing-something">
          <Spin size="large" />
        </div>
      ) : null} */}
    </>
  );
}

const mapStateToProps = state => ({
  isProcessingSomething: get(state, ['commonReducer', 'isProcessingSomething']),
  systemMessage: get(state, ['commonReducer', 'systemMessage'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        notifyMessageDone: commonActions.notifyMessageDone
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
