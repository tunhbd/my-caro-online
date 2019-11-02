import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
// import { Link } from 'react-router-dom';

import { authActions } from '../../../actions';
import '../../../commons/styles/auth-form.styles.css';
import ErrorLabel from '../../../commons/components/error-label';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.signInViaFacebook = this.signInViaFacebook.bind(this);
    this.signInViaGoogle = this.signInViaGoogle.bind(this);
  }

  componentDidMount() {}

  handleSubmit(e) {
    e.preventDefault();

    const { actions, form, isProcessAuth } = this.props;

    if (!isProcessAuth) {
      form.validateFields((err, values) => {
        if (!err) {
          actions.signIn(values.username, values.password);
        }
      });
    }
  }

  signInViaFacebook() {
    this.props.actions.signInViaSocial(
      `${process.env.REACT_APP_API_HOST}/user/facebook`
    );
  }

  signInViaGoogle() {
    this.props.actions.signInViaSocial(
      `${process.env.REACT_APP_API_HOST}/user/google`
    );
  }

  render() {
    const {
      form: { getFieldDecorator },
      authMessage,
      isProcessAuth
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="auth-form">
        <div className="auth-form__icon">
          <img src="/images/caro-logo.jpg" alt="caro icon" />
        </div>
        <Form.Item className="auth-form__item">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(255,255,255,0.3)' }} />
              }
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item className="auth-form__item">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={
                <Icon type="lock" style={{ color: 'rgba(255,255,255,0.3)' }} />
              }
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        {authMessage ? <ErrorLabel message={authMessage} /> : null}
        <Form.Item className="auth-form__item">
          {isProcessAuth ? (
            <Button
              type="primary"
              htmlType="submit"
              className="auth-form-button"
              loading
            >
              Login in
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="auth-form-button"
            >
              Log in
            </Button>
          )}
        </Form.Item>
        <div className="auth-form__social-logins">
          <Icon
            className="auth-form__social-logins__icon facebook-icon"
            type="facebook"
            theme="filled"
            style={{ fontSize: '20pt', color: '#3b5998' }}
            onClick={this.signInViaFacebook}
          />

          <Icon
            className="auth-form__social-logins__icon google-icon"
            type="google-circle"
            theme="filled"
            style={{ fontSize: '20pt', color: 'red' }}
            onClick={this.signInViaGoogle}
          />
        </div>
        <div className="auth-form__redirect">
          Or <a href="/sign-up">register now!</a>
        </div>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

const mapStateToProps = state => ({
  authMessage: get(state, ['authReducer', 'authMessage']),
  isProcessAuth: get(state, ['authReducer', 'isProcessAuth'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signIn: authActions.signIn,
        signInViaSocial: authActions.signInViaSocial
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginForm);
