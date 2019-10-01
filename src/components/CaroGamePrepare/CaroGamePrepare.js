import React from 'react';
import './CaroGamePrepare.styles.css';

export default function CaroGamePrepare(props) {
  const { className, isPlaying, currentPlayer, XPlayer, OPlayer } = props;
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
            <input disabled onChange={e => props.setXPlayer(e.target.value)} />
          ) : (
            <input onChange={e => props.setXPlayer(e.target.value)} />
          )}
        </div>
        <div className="player-input">
          <img src={OPlayerIcon} alt="" />
          {isPlaying ? (
            <input disabled onChange={e => props.setOPlayer(e.target.value)} />
          ) : (
            <input onChange={e => props.setOPlayer(e.target.value)} />
          )}
        </div>
      </div>
      <div className="buttons-container">
        <button
          type="button"
          className="restart-button"
          onClick={() => {
            props.restartGame();
          }}
        >
          restart
        </button>
        <button
          type="button"
          className={`play-button ${isPlaying ? 'stop' : ''}`}
          onClick={() => {
            if (!props.isPlaying) {
              props.restartGame();
            } else {
              props.stopGame();
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
