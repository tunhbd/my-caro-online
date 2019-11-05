import React from 'react';
import { Input, Button } from 'antd';
import { get } from 'lodash';
import { connect } from 'react-redux';

import { DEFAULT_AVATAR } from '../../../../../constants';
import './chat-box.styles.css';

const { TextArea } = Input;
class ChatBox extends React.Component {
  render() {
    const { chatMessages, profile, vsPlayer, sendMessage } = this.props;

    return (
      <div className="chat-box">
        <div className="chat-box__message-list">
          {chatMessages.map((msg, index) => {
            return (
              <div className="chat-box__message-list__item" key={index}>
                <img
                  src={
                    (msg.mine ? profile.avatar : vsPlayer.avatar) ||
                    DEFAULT_AVATAR
                  }
                  alt="avatar"
                />
                <div className="chat-box__message-list__item__message">
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
        <div className="chat-box__message-typing-box">
          <TextArea
            rows={2}
            ref={dom => {
              this.messageBox = dom;
            }}
          />
          <Button type="default" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatMessages: get(state, ['gameReducer', 'chatMessages']),
  profile: get(state, ['gameReducer', 'profile']),
  vsPlayer: get(state, ['gameReducer', 'vsPlayer'])
});

export default connect(
  mapStateToProps,
  null
)(ChatBox);
