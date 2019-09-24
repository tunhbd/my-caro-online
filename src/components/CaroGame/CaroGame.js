import React, { useState } from 'react';
import CaroGamePrepare from '../CaroGamePrepare/CaroGamePrepare';
import CaroGameBoard from '../CaroGameBoard/CaroGameBoard';
import CaroGameHistory from '../CaroGameHistory/CaroGameHistory';
import { cloneBoard } from '../../utils/clone-board';
import './CaroGame.styles.css';



export default function CaroGame(props) {
  const [XPlayer, setXPlayer] = useState(null);
  const [OPlayer, setOPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [result, setResult] = useState([]);
  const [isPlaying, setStatusMatch] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [boardStates, setBoardStates] = useState([]);
  const [currentBoardState, setCurrentBoardState] = useState({
    boardOrder: -1,
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
      boardOrder: 0,
      player: null,
    })
    notifyBoardIdInited(true);
  }

  const isWinner = (board, x, y) => {
    let response = null;

    response = countFollow(board, x, y, -1, 1, 0, 0, x => x > -1, x => x < rowCount);
    if (checkresponse(response)) {
      setResult(response.result);
      return true;
    }

    response = countFollow(board, x, y, 0, 0, -1, 1, (x, y) => y > -1, (x, y) => y < colCount);
    if (checkresponse(response)) {
      setResult(response.result);
      return true;
    }

    response = countFollow(board, x, y, -1, 1, -1, 1, (x, y) => x > -1 && y > -1, (x, y) => x < rowCount && y < colCount);
    if (checkresponse(response)) {
      setResult(response.result);
      return true;
    }

    response = countFollow(board, x, y, -1, 1, 1, -1, (x, y) => x > -1 && y < colCount, (x, y) => x < rowCount && y > -1);
    if (checkresponse(response)) {
      setResult(response.result);
      return true;
    }
  }

  const countFollow = (board, x, y, browseBeforeX, browseAfterX, browseBeforeY, browseAfterY, beforeCondition, afterCondition) => {
    let count = 1;
    let result = [{ x, y }];
    let xx, yy;
    let blockBefore = false, blockAfter = false;

    xx = x + browseBeforeX;
    yy = y + browseBeforeY;
    while (beforeCondition(xx, yy)) {
      if (board[xx][yy]) {
        if (board[xx][yy] === board[x][y]) {
          count++;
          result = [...result, { x: xx, y: yy }];
        } else {
          blockBefore = true;
          break;
        }
      }

      xx += browseBeforeX;
      yy += browseBeforeY;
    }

    xx = x + browseAfterX;
    yy = y + browseAfterY;
    while (afterCondition(xx, yy)) {
      if (board[xx][yy]) {
        if (board[xx][yy] === board[x][y]) {
          count++;
          result = [...result, { x: xx, y: yy }];
        } else {
          blockBefore = true;
          break;
        }
      }

      xx += browseAfterX;
      yy += browseAfterY;
    }

    return { count, result, blockBefore, blockAfter };
  }

  const checkresponse = response => {
    return response.count >= 5 && (!response.blockBefore || !response.blockAfter);
  }

  const changePlayer = player => {
    setCurrentPlayer(player);
  }

  const chooseCell = (x, y) => {
    const board = cloneBoard(boardStates[currentBoardState.boardOrder].board);
    board[x][y] = currentPlayer;

    if (currentBoardState.boardOrder + 1 < boardStates.length) {
      setBoardStates([
        ...boardStates.slice(0, currentBoardState.boardOrder + 1),
        {
          board,
          cell: {
            rowOrder: x,
            colOrder: y,
          },
          player: currentPlayer
        },
      ])
    } else {
      setBoardStates([
        ...boardStates,
        {
          board,
          cell: {
            rowOrder: x,
            colOrder: y,
          },
          player: currentPlayer
        },
      ])
    }

    setCurrentBoardState({
      boardOrder: currentBoardState.boardOrder + 1,
      player: currentPlayer,
    })

    if (isWinner(board, x, y)) {
      stopGame();
      setWinner(currentPlayer);
    } else {
      changePlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  const startGame = () => {
    setResult([]);
    initBoard(rowCount, colCount);
    setStatusMatch(true);
    setCurrentPlayer('X');
  }

  const stopGame = () => {
    setStatusMatch(false);
  }

  const restartGame = () => {
    setResult([]);
    setBoardStates([]);
    initBoard(rowCount, colCount);
    startGame();
  }

  const switchBoardState = stateOrder => {
    // console.log('change state', stateOrder);
    // console.log('board states', boardStates);
    setCurrentBoardState({ boardOrder: stateOrder });
    changePlayer(boardStates[stateOrder].player === 'X' ? 'O' : 'X');
  }

  if (!boardIsInited) {
    initBoard(rowCount, colCount);
  }

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
          result={result}
          board={boardStates[currentBoardState.boardOrder] ? boardStates[currentBoardState.boardOrder].board : []}
          chooseCell={chooseCell}
        />
        <CaroGameHistory
          className="caro-game__history"
          boardStates={boardStates}
          currentBoardState={currentBoardState}
          switchBoardState={switchBoardState}
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