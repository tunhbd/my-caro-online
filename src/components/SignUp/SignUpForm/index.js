import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp } from '../../../actions';
import './SignUpForm.styles.css';

class RegisterForm extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.actions.signUp({
          username: values.username,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,
          birthday: values.birthday
        });
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />
              }
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'Please input your firstname!' }]
          })(
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />
              }
              placeholder="Firstname"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Please input your lastname!' }]
          })(
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />
              }
              placeholder="Lastname"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('birthday', {
            rules: [{ required: true, message: 'Please input your birthday!' }]
          })(
            <Input
              type="Date"
              prefix={
                <Icon type="calendar" style={{ color: 'rgba(0,0,0,0.25)' }} />
              }
              placeholder="Birthday"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
          Or <a href="/sign-in">Sign In!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegisterForm = Form.create({ name: 'login_form' })(RegisterForm);

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signUp
      },
      dispatch
    )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(WrappedRegisterForm);
