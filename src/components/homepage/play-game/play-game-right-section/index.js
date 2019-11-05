import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Button } from 'antd';

import ChatBox from './chat-box';
import History from '../../../caro-game/history';
import './play-game-right-section.styles.css';

class PlayGameRightSection extends React.Component {
  render() {
    const { sendMessage, playOnline } = this.props;

    return (
      <div className="play-game__right-section">
        {playOnline ? <ChatBox sendMessage={sendMessage} /> : <History />}
        <div className="play-game__right-section__buttons">
          <Button type="primary">I want to undo</Button>
          <Button type="primary">Let`s draw</Button>
          <Button type="primary">I lose</Button>
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
