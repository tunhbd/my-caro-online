import React from 'react';
import { Progress } from 'antd';

import './player-item.styles.css';

export default class PlayerItem extends React.Component {
  render() {
    const {
      player: { avatar, name },
      inTurn
    } = this.props;

    // if (myTurn) {
    //   const
    // }

    return (
      <div className="player-item" style={{ opacity: inTurn ? '1' : '0.5' }}>
        <div className="player-item__avatar">
          <img src={avatar} alt="avatar player" />
        </div>
        <div className="player-item__name">{name}</div>
        {/* {inTurn ? (
          <Progress
            style={{ width: '50px', height: '50px' }}
            type='line'
            percent={100}
            // status=''
            format={() => ''}
          />
        ) : null} */}
      </div>
    );
  }
}
