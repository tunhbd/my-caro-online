import React from 'react';
import { Form, Icon, Input, Button, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { authActions } from '../../../actions';
import '../../../commons/styles/auth-form.styles.css';
import ErrorLabel from '../../../commons/components/error-label';
import { RestClient } from '../../../rest-client/rest-client';

const { Option } = Select;

class RegisterForm extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkExistsUsername = this.checkExistsUsername.bind(this);
  }

  async checkExistsUsername(rule, value, callback) {
    console.log('value', value);
    if (value) {
      const client = new RestClient();

      await client
        .asyncPost('/user/check-exists-username', {
          username: value
        })
        .then(res => {
          if (res.error) {
            return callback(res.error);
          }

          if (res.data.exists) {
            return callback(res.data.exists);
          }
        })
        .catch(err => console.log(err));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log('values', values.birthday.format('MM/DD/YYYY'));
      if (!err) {
        this.props.actions.signUp({
          username: values.username,
          password: values.password,
          display_name: values.display_name,
          birthday: values.birthday.format('YYYY-MM-DD'),
          email: values.email,
          gender: values.gender === 'male' ? 1 : 0
        });
      }
    });
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
        <Form.Item className="auth-form__item" label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                validator: this.checkExistsUsername,
                message: 'This username is taken'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(255,255,255,0.3)' }} />
              }
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item className="auth-form__item" label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]
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
        <Form.Item className="auth-form__item" label="Your name">
          {getFieldDecorator('display_name', {
            rules: [
              {
                required: true,
                message: 'Please input your name!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(255,255,255,0.3)' }} />
              }
              placeholder="your name"
            />
          )}
        </Form.Item>
        <Form.Item className="auth-form__item" label="Your email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your email!'
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />
              }
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item className="auth-form__item" label="Your birthday">
          {getFieldDecorator('birthday', {
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please select time!'
              }
            ]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item className="auth-form__item" label="Select gender">
          {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: 'Please select your gender!'
              }
            ]
          })(
            <Select placeholder="Select a option and change input text above">
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          )}
        </Form.Item>
        {authMessage ? <ErrorLabel message={authMessage} /> : null}
        <Form.Item className="auth-form__item">
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={isProcessAuth}
          >
            Register
          </Button>
          <div className="auth-form__redirect">
            Or <Link to="/sign-in">login now!</Link>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegisterForm = Form.create({ name: 'login_form' })(RegisterForm);

const mapStateToProps = state => ({
  authMessage: get(state, ['authReducer', 'authMessage']),
  isProcessAuth: get(state, ['authReducer', 'isProcessAuth'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signUp: authActions.signUp
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegisterForm);
