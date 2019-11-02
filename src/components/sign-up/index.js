import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';

import SignUpForm from './sign-up-form';
import { authActions } from '../../actions';
import './sign-up.styles.css';

class SignUp extends React.Component {
  componentDidMount() {
    const { token, actions } = this.props;

    token && actions.signOut();
  }

  render() {
    const { signUpSuccess } = this.props;

    return (
      <div className="sign-up-container">
        {signUpSuccess ? <Redirect to="/sign-in" /> : <SignUpForm />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signUpSuccess: get(state, ['authReducer', 'signUpSuccess']),
  token: get(state, ['authReducer', 'token'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signOut: authActions.signOut
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
