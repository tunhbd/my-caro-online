import React from 'react';
import { Input, Button } from 'antd';
import { get } from 'lodash';
import { connect } from 'react-redux';

import { DEFAULT_AVATAR } from '../../../../../constants';
import './chat-box.styles.css';

const { TextArea } = Input;
class ChatBox extends React.Component {
  constructor() {
    super();

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    const text = this.messageBox.textAreaRef.value;

    if (text !== '') {
      this.props.sendMessage(text);
      this.messageBox.textAreaRef.value = '';
    }
  }

  render() {
    const { chatMessages, profile, vsPlayer } = this.props;

    return (
      <div className="chat-box">
        <div className="chat-box__message-list">
          {chatMessages.map((msg, index) => {
            return (
              <div
                className={`chat-box__message-list__item ${
                  msg.mine ? '' : 'of-player'
                }`}
                key={index}
              >
                <img
                  src={
                    (msg.mine ? profile.avatar : vsPlayer.avatar) ||
                    DEFAULT_AVATAR
                  }
                  alt="avatar"
                />
                <div className="chat-box__message-list__item__message">
                  <span>{msg.text}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chat-box__message-typing-box">
          <TextArea
            className="typing-box"
            rows={1}
            ref={dom => {
              this.messageBox = dom;
            }}
          />
          <Button
            className="send-button"
            type="default"
            onClick={this.sendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatMessages: get(state, ['gameReducer', 'chatMessages']),
  profile: get(state, ['authReducer', 'profile']),
  vsPlayer: get(state, ['gameReducer', 'vsPlayer'])
});

export default connect(
  mapStateToProps,
  null
)(ChatBox);
