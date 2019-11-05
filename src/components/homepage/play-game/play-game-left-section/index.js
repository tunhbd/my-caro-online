import React from 'react';
import { get } from 'lodash';
import { Spin, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlayerItem from './player-item';
// import { gameActions } from '../../../../actions';
import CaroGameBoard from '../../../caro-game/board';
import { DEFAULT_AVATAR } from '../../../../constants';
import './play-game-left-section.styles.css';

class PlayGameLeftSection extends React.Component {
  constructor() {
    super();

    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.props.startGame();
  }

  render() {
    const {
      profile,
      playOnline,
      vsPlayer,
      findingPlayer,
      isPlaying,
      notifyResult,
      IAmReady,
      chooseCell,
      myTurn
    } = this.props;

    return (
      <div className="play-game__left-section">
        <div className="play-game__left-section__player-list">
          <PlayerItem
            player={{
              avatar: get(profile, 'avatar', DEFAULT_AVATAR) || DEFAULT_AVATAR,
              name: 'You'
            }}
            inTurn={isPlaying ? myTurn : true}
          />
          <img
            className="play-game__left-section__player-list__vs"
            src="/images/caro-vs.jpg"
            alt="vs"
          />
          {playOnline ? (
            <PlayerItem
              player={
                vsPlayer || {
                  avatar: '/images/default-avatar.png',
                  name: 'Waiting'
                }
              }
              inTurn={isPlaying ? !myTurn : true}
            />
          ) : (
            <PlayerItem
              player={{
                avatar: '/images/default-avatar.png',
                name: 'Computer'
              }}
              inTurn={!myTurn}
            />
          )}
        </div>
        <div className="play-game__left-section__game-board">
          <CaroGameBoard rowCount={19} colCount={20} chooseCell={chooseCell} />
          {isPlaying ? null : (
            <div className="play-game__left-section__game-board__prepare">
              {playOnline ? (
                findingPlayer ? (
                  <div className="play-game__left-section__game-board__finding-player-status">
                    Finding... <Spin size="large" />
                  </div>
                ) : vsPlayer ? (
                  IAmReady ? (
                    <div className="play-game__left-section__game-board__finding-player-status">
                      Waiting player ready... <Spin size="large" />
                    </div>
                  ) : (
                    <Button
                      type="primary"
                      onClick={this.startGame}
                      className="play-game__left-section__game-board__start-game-button"
                    >
                      Start game
                    </Button>
                  )
                ) : (
                  <Button
                    type="primary"
                    onClick={this.props.findPlayer}
                    className="play-game__left-section__game-board__find-player-button"
                  >
                    Find player
                  </Button>
                )
              ) : notifyResult ? null : (
                <Button
                  type="primary"
                  onClick={this.startGame}
                  className="play-game__left-section__game-board__start-game-button"
                >
                  Start game
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: get(state, ['authReducer', 'profile']),
  playOnline: get(state, ['gameReducer', 'playOnline']),
  vsPlayer: get(state, ['gameReducer', 'vsPlayer']),
  isPlaying: get(state, ['gameReducer', 'isPlaying']),
  findingPlayer: get(state, ['gameReducer', 'findingPlayer']),
  IAmReady: get(state, ['gameReducer', 'IAmReady']),
  myTurn: get(state, ['gameReducer', 'myTurn']),
  notifyResult: get(state, ['gameReducer', 'notifyResult'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        // startGame: gameActions.startGame
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayGameLeftSection);
