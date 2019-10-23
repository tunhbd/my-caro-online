import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import './SignUp.styles.css';

function SignUp(props) {
  return (
    <div className="sign-up-container">
      {props.signUpSuccess ? <Redirect to="/sign-in" /> : <SignUpForm />}
    </div>
  );
}

const mapStateToProps = state => ({
  signUpSuccess: state.signUpSuccess
});

export default connect(
  mapStateToProps,
  null
)(SignUp);
