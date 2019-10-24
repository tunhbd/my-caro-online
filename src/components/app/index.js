import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
import { get } from 'lodash';
import CaroGame from '../caro-game';
import SignIn from '../../pages/sign-in';
import SignUp from '../../pages/sign-up';
import Loading from '../loading';
import './app.css';

const CaroGameComponent = Loadable({
  loader: async () => CaroGame,
  loading: Loading
});

// const SignInComponent = Loadable({
//   loader: () => SignIn,
//   loading: Loading
// });

// const SignUpComponent = Loadable({
//   loader: () => SignUp,
//   loading: Loading
// });

function App(props) {
  const { isProcessingSomething } = props;

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <CaroGameComponent rowCount={20} colCount={20} />
          </Route>
          <Route path="/sign-in" exact={true}>
            <SignIn />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUp />
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
