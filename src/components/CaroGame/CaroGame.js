import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import CaroGamePrepare from '../CaroGamePrepare/CaroGamePrepare';
import CaroGameBoard from '../CaroGameBoard/CaroGameBoard';
import CaroGameHistory from '../CaroGameHistory/CaroGameHistory';
import { cloneBoard } from '../../utils/clone-board';
import { withAuth } from '../../hoc/with-auth';
import * as reduxActions from '../../actions';
import './CaroGame.styles.css';

function CaroGame(props) {
  const [boardIsInited, notifyBoardIdInited] = useState(false);

  const {
    rowCount,
    colCount,
    winner,
    actions,
    boardStates,
    currentBoardState,
    currentPlayer,
    XPlayer,
    OPlayer
  } = props;

  const initBoard = (rowNum, colNum) => {
    const board = [];

    for (let rowIndex = 1; rowIndex <= rowNum; rowIndex += 1) {
      const row = [];

      for (let col = 1; col < colNum; col += 1) {
        row.push(null);
      }

      board.push(row);
    }

    actions.setBoardStates([
      {
        cell: {
          rowOrder: null,
          colOrder: null
        },
        board,
        player: null
      }
    ]);

    actions.setCurrentBoardState({
      boardOrder: 0,
      player: null
    });
    notifyBoardIdInited(true);
  };

  const countFollow = (
    board,
    x,
    y,
    browseBeforeX,
    browseAfterX,
    browseBeforeY,
    browseAfterY,
    beforeCondition,
    afterCondition
  ) => {
    let count = 1;
    let resultCount = [{ x, y }];
    let xx;
    let yy;
    let blockBefore = false;
    const blockAfter = false;

    xx = x + browseBeforeX;
    yy = y + browseBeforeY;
    while (beforeCondition(xx, yy)) {
      if (board[xx][yy]) {
        if (board[xx][yy] === board[x][y]) {
          count += 1;
          resultCount = [...resultCount, { x: xx, y: yy }];
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
          count += 1;
          resultCount = [...resultCount, { x: xx, y: yy }];
        } else {
          blockBefore = true;
          break;
        }
      }

      xx += browseAfterX;
      yy += browseAfterY;
    }

    return { count, result: resultCount, blockBefore, blockAfter };
  };

  const checkresponse = response => {
    return (
      response.count >= 5 && (!response.blockBefore || !response.blockAfter)
    );
  };

  const isWinner = (board, x, y) => {
    let response = null;
    let won = false;

    response = countFollow(
      board,
      x,
      y,
      -1,
      1,
      0,
      0,
      xx => xx > -1,
      xx => xx < rowCount
    );
    if (checkresponse(response)) {
      actions.setResult(response.result);
      won = true;
    } else {
      response = countFollow(
        board,
        x,
        y,
        0,
        0,
        -1,
        1,
        (xx, yy) => yy > -1,
        (xx, yy) => yy < colCount
      );
      if (checkresponse(response)) {
        actions.setResult(response.result);
        won = true;
      } else {
        response = countFollow(
          board,
          x,
          y,
          -1,
          1,
          -1,
          1,
          (xx, yy) => xx > -1 && yy > -1,
          (xx, yy) => xx < rowCount && yy < colCount
        );
        if (checkresponse(response)) {
          actions.setResult(response.result);
          won = true;
        } else {
          response = countFollow(
            board,
            x,
            y,
            -1,
            1,
            1,
            -1,
            (xx, yy) => xx > -1 && yy < colCount,
            (xx, yy) => xx < rowCount && yy > -1
          );
          if (checkresponse(response)) {
            actions.setResult(response.result);
            won = true;
          }
        }
      }
    }

    return won;
  };

  const changePlayer = player => {
    actions.setCurrentPlayer(player);
  };

  const stopGame = () => {
    actions.setStatusMatch(false);
  };

  const chooseCell = (x, y) => {
    const board = cloneBoard(boardStates[currentBoardState.boardOrder].board);
    board[x][y] = currentPlayer;

    if (currentBoardState.boardOrder + 1 < boardStates.length) {
      actions.setBoardStates([
        ...boardStates.slice(0, currentBoardState.boardOrder + 1),
        {
          board,
          cell: {
            rowOrder: x,
            colOrder: y
          },
          player: currentPlayer
        }
      ]);
    } else {
      actions.setBoardStates([
        ...boardStates,
        {
          board,
          cell: {
            rowOrder: x,
            colOrder: y
          },
          player: currentPlayer
        }
      ]);
    }

    actions.setCurrentBoardState({
      boardOrder: currentBoardState.boardOrder + 1,
      player: currentPlayer
    });

    if (isWinner(board, x, y)) {
      stopGame();
      actions.setWinner(currentPlayer);
    } else {
      changePlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const startGame = () => {
    actions.setResult([]);
    initBoard(rowCount, colCount);
    actions.setStatusMatch(true);
    actions.setCurrentPlayer('X');
  };

  const restartGame = () => {
    actions.setResult([]);
    actions.setBoardStates([]);
    initBoard(rowCount, colCount);
    startGame();
  };

  const switchBoardState = stateOrder => {
    actions.setCurrentBoardState({ boardOrder: stateOrder });
    changePlayer(boardStates[stateOrder].player === 'X' ? 'O' : 'X');
  };

  if (!boardIsInited) {
    initBoard(rowCount, colCount);
  }

  return (
    <>
      <div className="caro-game">
        <CaroGamePrepare
          className="caro-game__prepare"
          startGame={startGame}
          stopGame={stopGame}
          restartGame={restartGame}
        />
        <CaroGameBoard
          className="caro-game__board"
          rowCount={rowCount}
          colCount={colCount}
          chooseCell={chooseCell}
        />
        <CaroGameHistory
          className="caro-game__history"
          switchBoardState={switchBoardState}
        />
      </div>
      {winner ? (
        <div className="notification">
          <div className="notification__content">
            <span>
              Congratulate!!! {winner === 'X' ? XPlayer : OPlayer} won.
            </span>
            <button type="button" onClick={() => actions.setWinner(null)}>
              Ok
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = state => ({
  XPlayer: get(state, 'XPlayer'),
  OPlayer: get(state, 'OPlayer'),
  winner: get(state, 'winner'),
  boardStates: get(state, 'boardStates'),
  currentBoardState: get(state, 'currentBoardState'),
  currentPlayer: get(state, 'currentPlayer')
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setWinner: reduxActions.setWinner,
        setBoardStates: reduxActions.setBoardStates,
        setCurrentBoardState: reduxActions.setCurrentBoardState,
        setResult: reduxActions.setResult,
        setStatusMatch: reduxActions.setStatusMatch,
        setCurrentPlayer: reduxActions.setCurrentPlayer
      },
      dispatch
    )
  };
};

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CaroGame)
);
