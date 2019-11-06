import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Button } from 'antd';

import ChatBox from './chat-box';
import History from '../../../caro-game/history';
import './play-game-right-section.styles.css';

class PlayGameRightSection extends React.Component {
  render() {
    const {
      sendMessage,
      playOnline,
      requestUndo,
      requestLose,
      requestDraw
    } = this.props;

    return (
      <div className="play-game__right-section">
        {playOnline ? <ChatBox sendMessage={sendMessage} /> : <History />}
        <div className="play-game__right-section__buttons">
          <Button type="primary" onClick={requestUndo}>
            I want to undo
          </Button>
          <Button type="primary" onClick={requestDraw}>
            Let`s draw
          </Button>
          <Button type="primary" onClick={requestLose}>
            I lose
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playOnline: get(state, ['gameReducer', 'playOnline'])
});

export default connect(
  mapStateToProps,
  null
)(PlayGameRightSection);
