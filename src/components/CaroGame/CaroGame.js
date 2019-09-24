import React, { useState } from 'react';
import CaroGamePrepare from '../CaroGamePrepare/CaroGamePrepare';
import CaroGameBoard from '../CaroGameBoard/CaroGameBoard';
import CaroGameHistory from '../CaroGameHistory/CaroGameHistory';
import './CaroGame.styles.css';



export default function CaroGame(props) {
  const [XPlayer, setXPlayer] = useState(null);
  const [OPlayer, setOPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isPlaying, setStatusMatch] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [boardStates, setBoardStates] = useState([]);
  const [currentBoardState, setCurrentBoardState] = useState({
    boardOder: -1,
    player: null
  })
  const [boardIsInited, notifyBoardIdInited] = useState(false);

  const { rowCount, colCount } = props;

  const initBoard = (rowCount, colCount) => {
    const board = [];

    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
      let row = [];

      for (let col = 1; col < colCount; col++) {
        row.push(null);
      }

      board.push(row);
    }

    setBoardStates([
      {
        cell: {
          rowOrder: null,
          colOrder: null,
        },
        board: board,
        player: null,
      }
    ])


    setCurrentBoardState({
      boardOder: 0,
      player: null,
    })
    notifyBoardIdInited(true);
  }

  const isWinner = (x, y) => {
    return true;
  }

  const chooseCell = (x, y) => {
    const board = boardStates[currentBoardState.boardOder].board;
    board[x][y] = currentPlayer;

    setCurrentBoardState({
      boardOder: currentBoardState.boardOder + 1,
      player: currentPlayer,
    })
    setBoardStates([...boardStates, {
      board,
      cell: {
        rowOrder: x,
        colOrder: y,
      },
      player: currentPlayer
    }])

    if (isWinner(x, y)) {
      stopGame();
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  const startGame = () => {
    initBoard(rowCount, colCount);
    setStatusMatch(true);
    setCurrentPlayer('X');
  }

  const stopGame = () => {
    setStatusMatch(false);
  }

  const restartGame = () => {
    setBoardStates([]);
    initBoard(rowCount, colCount);
    startGame();
  }

  console.log(boardIsInited);
  if (!boardIsInited) {
    initBoard(rowCount, colCount);
  }

  console.log('init', boardStates);
  return (
    <React.Fragment>
      <div className="caro-game">
        <CaroGamePrepare
          className="caro-game__prepare"
          setXPlayer={setXPlayer}
          setOPlayer={setOPlayer}
          isPlaying={isPlaying}
          XPlayer={XPlayer}
          OPlayer={OPlayer}
          // currentBoardState={currentBoardState}
          currentPlayer={currentPlayer}
          startGame={startGame}
          stopGame={stopGame}
          restartGame={restartGame}
        />
        <CaroGameBoard
          className="caro-game__board"
          rowCount={rowCount}
          colCount={colCount}
          isPlaying={isPlaying}
          board={boardStates[currentBoardState.boardOder] ? boardStates[currentBoardState.boardOder].board : []}
          chooseCell={chooseCell}
        />
        <CaroGameHistory
          className="caro-game__history"
          boardStates={boardStates}
        />
      </div>
      {
        winner
          ? (<div className="notification">
            <div className="notification__content">
              <span>Congratulate!!! {winner === 'X' ? XPlayer : OPlayer} won.</span>
              <button onClick={() => setWinner(null)}>
                Ok
              </button>
            </div>
          </div>)
          : null
      }
    </React.Fragment>
  );
}