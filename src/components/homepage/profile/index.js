import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, DatePicker, Form, Input, Icon, Select, Modal } from 'antd';
import moment from 'moment';
import { get } from 'lodash';

import Avatar from './avatar';
import ErrorLabel from '../../../commons/components/error-label';
import ChangePasswordDialog from './change-password-dialog';
import { authActions } from '../../../actions';
import '../../../commons/styles/auth-form.styles.css';
import './profile.styles.css';

const { Option } = Select;

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isUpdating: false
      // visibleChangePasswordDialog: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangePasswordOk = this.handleChangePasswordOk.bind(this);
    this.handleChangePasswordCancel = this.handleChangePasswordCancel.bind(
      this
    );
  }

  handleChangePasswordOk(e) {
    console.log(e);
    this.setState({
      visibleChangePasswordDialog: false
    });
  }

  handleChangePasswordCancel(e) {
    console.log(e);
    this.setState({
      visibleChangePasswordDialog: false
    });
  }

  handleCancel() {
    this.setState({
      isUpdating: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.updateProfile({
          display_name: values.display_name,
          birthday: values.birthday.format('YYYY-MM-DD'),
          email: values.email,
          gender: values.gender === 'male' ? 1 : 0
        });
      }
    });
  }

  changePassword() {
    this.props.actions.openChangePasswordDialog();
  }

  render() {
    const { isUpdating } = this.state;
    const {
      isProcessAuth,
      isChangePassword,
      authMessage,
      form: { getFieldDecorator },
      profile
    } = this.props;

    return (
      <div className="profile">
        <div className="profile__content">
          <Avatar />
          <div className="profile__content__info">
            <Form onSubmit={this.handleSubmit} className="auth-form">
              <Form.Item className="auth-form__item" label="Your name">
                {getFieldDecorator('display_name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your name!'
                    }
                  ],
                  initialValue: get(profile, ['display_name'], '')
                })(
                  <Input
                    prefix={
                      <Icon
                        type="user"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                      />
                    }
                    placeholder="your name"
                    disabled={!isUpdating || (isUpdating && isProcessAuth)}
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
                  ],
                  initialValue: get(profile, ['email'], '')
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />
                    }
                    placeholder="Email"
                    disabled={!isUpdating}
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
                  ],
                  initialValue: moment(
                    get(profile, ['birthday'], ''),
                    'YYYY-MM-DD'
                  )
                })(<DatePicker disabled={!isUpdating} />)}
              </Form.Item>
              <Form.Item className="auth-form__item" label="Select gender">
                {getFieldDecorator('gender', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your gender!'
                    }
                  ],
                  initialValue:
                    get(profile, ['gender'], '') === 0
                      ? 'female'
                      : get(profile, ['gender'], '') === 1
                      ? 'male'
                      : ''
                })(
                  <Select placeholder="Select a option" disabled={!isUpdating}>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                  </Select>
                )}
              </Form.Item>
              {authMessage ? <ErrorLabel message={authMessage} /> : null}
              <Form.Item className="auth-form__item">
                {!isUpdating ? (
                  <>
                    <Button
                      type="primary"
                      htmlType="button"
                      className="auth-form-button"
                      onClick={this.changePassword}
                    >
                      Change password
                    </Button>
                    <Button
                      type="primary"
                      htmlType="button"
                      className="auth-form-button"
                      onClick={() => this.setState({ isUpdating: true })}
                      // loading={isProcessAuth}
                    >
                      Update profile
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="auth-form-button"
                      loading={isProcessAuth}
                    >
                      Update
                    </Button>
                    <Button
                      type="danger"
                      className="auth-form-button"
                      onClick={this.handleCancel}
                      disabled={isProcessAuth}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        {isChangePassword ? <ChangePasswordDialog /> : null}
      </div>
    );
  }
}

const WrappedProfile = Form.create({ name: 'profile_form' })(Profile);

const mapStateToProps = state => ({
  profile: get(state, ['authReducer', 'profile']),
  authMessage: get(state, ['authReducer', 'authMessage']),
  isProcessAuth: get(state, ['authReducer', 'isProcessAuth']),
  isChangePassword: get(state, ['authReducer', 'isChangePassword'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchProfile: authActions.fetchProfile,
        updateProfile: authActions.updateProfile,
        openChangePasswordDialog: authActions.openChangePasswordDialog
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedProfile);
