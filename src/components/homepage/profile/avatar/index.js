import React from 'react';
import { Upload, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import { authActions } from '../../../../actions';
import './avatar.styles.css';

class Avatar extends React.Component {
  constructor() {
    super();

    this.state = {
      previewVisible: false,
      previewImage: ''
    };

    // this.handlePreview = this.handlePreview.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
    this.handChange = this.handChange.bind(this);
  }

  // async handlePreview(file) {
  //   // if (!file.url && !file.preview) {
  //   //   file.preview = await getBase64(file.originFileObj);
  //   // }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //   });
  // };

  // handleCancel() {
  //   this.setState({ previewVisible: false });
  // }

  handChange(info) {
    const { actions } = this.props;

    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      // actions.updateAvatar(info);
      console.log('info', this.props);
      actions.updateProfileSuccess(info.file.response.data.profile);
      // message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    const {
      profile: { avatar },
      token
    } = this.props;
    console.log('props', this.props);

    // const { previewImage, previewVisible, fileList } = this.state;

    // const uploadButton = (
    //   <div>
    //     <Icon type="plus" />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );

    return (
      <div className="profile-avatar">
        <Upload
          name="avatar"
          action={`${process.env.REACT_APP_API_HOST}/user/upload-avatar`}
          onChange={this.handChange}
          headers={{
            Authorization: `Bearer ${token}`
          }}
        >
          <div className="profile-avatar__preview">
            {avatar ? <img src={avatar} alt="avatar" /> : <Icon type="plus" />}
          </div>
        </Upload>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: get(state, ['authReducer', 'profile']),
  token: get(state, ['authReducer', 'token'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        updateProfileSuccess: authActions.updateProfileSuccess
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
