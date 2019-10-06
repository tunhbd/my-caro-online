import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as reduxActions from '../../actions';
import './CaroGamePrepare.styles.css';

function CaroGamePrepare(props) {
  const {
    className,
    isPlaying,
    currentPlayer,
    XPlayer,
    OPlayer,
    actions,
    restartGame,
    stopGame,
    startGame
  } = props;
  const XPlayerIcon = '/images/caro-x.jpg';
  const OPlayerIcon = '/images/caro-o.jpg';
  const logo = '/images/caro-logo.jpg';

  return (
    <div className={className}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div>
        <div className="player-input">
          <img src={XPlayerIcon} alt="" />
          {isPlaying ? (
            <input
              disabled
              onChange={e => actions.setXPlayer(e.target.value)}
            />
          ) : (
            <input onChange={e => actions.setXPlayer(e.target.value)} />
          )}
        </div>
        <div className="player-input">
          <img src={OPlayerIcon} alt="" />
          {isPlaying ? (
            <input
              disabled
              onChange={e => actions.setOPlayer(e.target.value)}
            />
          ) : (
            <input onChange={e => actions.setOPlayer(e.target.value)} />
          )}
        </div>
      </div>
      <div className="buttons-container">
        <button
          type="button"
          className="restart-button"
          onClick={() => {
            restartGame();
          }}
        >
          restart
        </button>
        <button
          type="button"
          className={`play-button ${isPlaying ? 'stop' : ''}`}
          onClick={() => {
            if (!isPlaying) {
              startGame();
            } else {
              stopGame();
            }
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
      {isPlaying ? (
        <div className="game-status">
          <div
            className="game-status__player player-x"
            style={{
              opacity: currentPlayer === 'X' ? '1' : '0.5',
              background: currentPlayer === 'X' ? '#78C747' : 'none'
            }}
          >
            <img src={XPlayerIcon} alt="" />
            {XPlayer}
          </div>
          <div
            className="game-status__player player-o"
            style={{
              opacity: currentPlayer === 'O' ? '1' : '0.5',
              background: currentPlayer === 'O' ? '#78C747' : 'none'
            }}
          >
            <img src={OPlayerIcon} alt="" />
            {OPlayer}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = state => ({
  isPlaying: get(state, 'isPlaying'),
  XPlayer: get(state, 'XPlayer'),
  OPlayer: get(state, 'OPlayer'),
  currentPlayer: get(state, 'currentPlayer')
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setXPlayer: reduxActions.setXPlayer,
        setOPlayer: reduxActions.setOPlayer
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaroGamePrepare);
