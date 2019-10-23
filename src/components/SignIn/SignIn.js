import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';
import './SignIn.styles.css';

function SignIn(props) {
  const { token } = props;

  return (
    <div className="sign-in-container">
      {token ? <Redirect to="/" /> : <SignInForm />}
    </div>
  );
}

const mapStateToProps = state => ({
  token: state.token
});

export default connect(
  mapStateToProps,
  null
)(SignIn);
