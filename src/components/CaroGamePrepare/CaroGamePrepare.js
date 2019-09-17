import React from 'react';
import './CaroGamePrepare.styles.css';

export default function CaroGamePrepare(props) {
  const XPlayerIcon = '/images/caro-x.jpg';
  const OPlayerIcon = '/images/caro-o.jpg';
  const logo = '/images/caro-logo.jpg';
  return (
    <div className={props.className}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div>
        <div className="player-input">
          <img src={XPlayerIcon} alt="" />
          {
            props.isPlaying
              ? (
                <input
                  disabled
                  onChange={e => props.setXPlayer(e.target.value)}
                />
              )
              : (
                <input
                  onChange={e => props.setXPlayer(e.target.value)}
                />
              )
          }
        </div>
        <div className="player-input">
          <img src={OPlayerIcon} alt="" />
          {
            props.isPlaying
              ? (
                <input
                  disabled
                  onChange={e => props.setOPlayer(e.target.value)}
                />
              )
              : (
                <input
                  onChange={e => props.setOPlayer(e.target.value)}
                />
              )
          }
        </div>
      </div>
      <div className="buttons-container">
        <button
          className="restart-button"
          onClick={() => {
            props.setInitBoard(false);
            props.setCurrentPlayer('X');
          }}
        >
          restart
        </button>
        <button
          className={`play-button ${props.isPlaying ? 'stop' : ''}`}
          onClick={() => {
            if (!props.isPlaying) {
              props.setInitBoard(false)
            }
            props.setCurrentPlayer(props.isPlaying ? null : 'X');
            props.setStatusMatch(!props.isPlaying);
          }}
        >
          {props.isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
      {
        props.isPlaying
          ? (
            <div className="game-status">
              <div
                className="game-status__player player-x"
                style={{
                  opacity: props.currentPlayer === 'X' ? "1" : "0.5",
                  background: props.currentPlayer === 'X' ? "#78C747" : "none"
                }}
              >
                <img src={XPlayerIcon} alt="" />
                {props.XPlayer}
              </div>
              <div
                className="game-status__player player-o"
                style={{
                  opacity: props.currentPlayer === 'O' ? "1" : "0.5",
                  background: props.currentPlayer === 'O' ? "#78C747" : "none"
                }}
              >
                <img src={OPlayerIcon} alt="" />
                {props.OPlayer}
              </div>
            </div>
          )
          : null
      }
    </div>
  );
}