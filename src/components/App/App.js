import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CaroGame from '../CaroGame/CaroGame';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <CaroGame rowCount={20} colCount={20} />
        </Route>
        <Route path="/sign-in" exact={true}>
          <SignIn />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
