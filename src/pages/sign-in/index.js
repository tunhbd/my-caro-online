import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authActions } from '../../actions';
import SignInForm from '../../components/sign-in-form';
// import { didAuth } from '../../hoc/did-auth';
import './sign-in.styles.css';

class SignIn extends React.Component {
  componentDidMount() {
    this.props.actions.checkAuthorizated();
  }

  render() {
    const { token } = this.props;

    return (
      <div className="sign-in-container">
        {token ? <Redirect to="/" /> : <SignInForm />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        checkAuthorizated: authActions.checkAuthorizated
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
