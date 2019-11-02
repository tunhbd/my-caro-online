import React from 'react';
import { Modal, Form, Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import ErrorLabel from '../../../../commons/components/error-label';
import { authActions } from '../../../../actions';
import { RestClient } from '../../../../rest-client/rest-client';

import '../../../../commons/styles/auth-form.styles.css';

class ChangePasswordDialog extends React.Component {
  constructor() {
    super();

    this.handleOk = this.handleOk.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isProcessAuth, form, actions } = this.props;

    if (!isProcessAuth) {
      console.log('change');
      form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          actions.changePassword(values.new_password);
        } else {
          // console.log(err);
        }
      });
    }
  }

  async checkOldPassword(rule, value, callback) {
    if (value) {
      const client = new RestClient();

      await client
        .asyncPost('/user/check-password', { password: value })
        .then(res => {
          if (res.error) {
            return callback(res.error);
          }

          if (!res.data.correct) {
            return callback(true);
          }

          // callback(null);
        })
        .catch(err => console.log(err));
    }
  }

  handleOk() {
    this.changeButton.buttonNode.click();
  }

  render() {
    const {
      form: { getFieldDecorator },
      authMessage,
      isProcessAuth,
      actions
    } = this.props;
    return (
      <Modal
        title="Change password"
        visible={true}
        closable={false}
        okText="Change"
        okButtonProps={{
          loading: isProcessAuth
        }}
        onOk={this.handleOk}
        cancelButtonProps={{
          disabled: isProcessAuth
        }}
        onCancel={() => actions.closeChangePasswordDialog()}
      >
        <Form onSubmit={this.handleSubmit} className="auth-form">
          <Form.Item className="auth-form__item">
            {getFieldDecorator('old_password', {
              rules: [
                {
                  required: true,
                  message: 'Please input old Password!'
                },
                {
                  validator: this.checkOldPassword,
                  message: 'The old password is incorrect'
                }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  />
                }
                type="password"
                placeholder="Old password"
              />
            )}
          </Form.Item>
          <Form.Item className="auth-form__item">
            {getFieldDecorator('new_password', {
              rules: [{ required: true, message: 'Please input new Password!' }]
            })(
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  />
                }
                type="password"
                placeholder="New password"
              />
            )}
          </Form.Item>
          {authMessage ? <ErrorLabel message={authMessage} /> : null}
          <Form.Item className="auth-form__item">
            <Button
              type="primary"
              htmlType="submit"
              className="auth-form-button"
              style={{ display: 'none' }}
              ref={dom => {
                this.changeButton = dom;
              }}
            >
              Change
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedChangePasswordDialog = Form.create({
  name: 'change_password_form'
})(ChangePasswordDialog);

const mapStateToProps = state => ({
  isProcessAuth: get(state, ['authReducer', 'isProcessAuth'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeChangePasswordDialog: authActions.closeChangePasswordDialog,
        changePassword: authActions.changePassword
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedChangePasswordDialog);
