import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
// import CaroGamePrepare from './prepare';
import CaroGameBoard from './board';
import CaroGameHistory from './history';
import { cloneBoard } from '../../utils/clone-board';
import { withAuth } from '../../hoc/with-auth';
import { gameActions } from '../../actions';
import './caro-game.styles.css';

function CaroGame(props) {
  // const [boardIsInited, notifyBoardIdInited] = useState(false);

  // const {
  //   rowCount,
  //   colCount,
  //   actions,
  //   boardStates,
  //   currentBoardState,
  //   myTurn,
  //   symbol,
  //   nextTurn
  // } = props;

  // const initBoard = (rowNum, colNum) => {
  //   const board = [];

  //   for (let rowIndex = 1; rowIndex <= rowNum; rowIndex += 1) {
  //     const row = [];

  //     for (let col = 1; col < colNum; col += 1) {
  //       row.push(null);
  //     }

  //     board.push(row);
  //   }

  //   actions.addNewBoardState({
  //     cell: {
  //       rowOrder: null,
  //       colOrder: null
  //     },
  //     board,
  //     myTurn
  //   });

  //   actions.setCurrentBoardState({
  //     boardOrder: 0
  //     // player: null
  //   });
  //   notifyBoardIdInited(true);
  // };

  // const countFollow = (
  //   board,
  //   x,
  //   y,
  //   browseBeforeX,
  //   browseAfterX,
  //   browseBeforeY,
  //   browseAfterY,
  //   beforeCondition,
  //   afterCondition
  // ) => {
  //   let count = 1;
  //   let resultCount = [{ x, y }];
  //   let xx;
  //   let yy;
  //   let blockBefore = false;
  //   const blockAfter = false;

  //   xx = x + browseBeforeX;
  //   yy = y + browseBeforeY;
  //   while (beforeCondition(xx, yy)) {
  //     if (board[xx][yy]) {
  //       if (board[xx][yy] === board[x][y]) {
  //         count += 1;
  //         resultCount = [...resultCount, { x: xx, y: yy }];
  //       } else {
  //         blockBefore = true;
  //         break;
  //       }
  //     }

  //     xx += browseBeforeX;
  //     yy += browseBeforeY;
  //   }

  //   xx = x + browseAfterX;
  //   yy = y + browseAfterY;
  //   while (afterCondition(xx, yy)) {
  //     if (board[xx][yy]) {
  //       if (board[xx][yy] === board[x][y]) {
  //         count += 1;
  //         resultCount = [...resultCount, { x: xx, y: yy }];
  //       } else {
  //         blockBefore = true;
  //         break;
  //       }
  //     }

  //     xx += browseAfterX;
  //     yy += browseAfterY;
  //   }

  //   return { count, result: resultCount, blockBefore, blockAfter };
  // };

  // const checkresponse = response => {
  //   return (
  //     response.count >= 5 && (!response.blockBefore || !response.blockAfter)
  //   );
  // };

  // const isWinner = (board, x, y) => {
  //   let response = null;
  //   let won = false;

  //   response = countFollow(
  //     board,
  //     x,
  //     y,
  //     -1,
  //     1,
  //     0,
  //     0,
  //     xx => xx > -1,
  //     xx => xx < rowCount
  //   );
  //   if (checkresponse(response)) {
  //     actions.setResult(response.result);
  //     won = true;
  //   } else {
  //     response = countFollow(
  //       board,
  //       x,
  //       y,
  //       0,
  //       0,
  //       -1,
  //       1,
  //       (xx, yy) => yy > -1,
  //       (xx, yy) => yy < colCount
  //     );
  //     if (checkresponse(response)) {
  //       actions.setResult(response.result);
  //       won = true;
  //     } else {
  //       response = countFollow(
  //         board,
  //         x,
  //         y,
  //         -1,
  //         1,
  //         -1,
  //         1,
  //         (xx, yy) => xx > -1 && yy > -1,
  //         (xx, yy) => xx < rowCount && yy < colCount
  //       );
  //       if (checkresponse(response)) {
  //         actions.setResult(response.result);
  //         won = true;
  //       } else {
  //         response = countFollow(
  //           board,
  //           x,
  //           y,
  //           -1,
  //           1,
  //           1,
  //           -1,
  //           (xx, yy) => xx > -1 && yy < colCount,
  //           (xx, yy) => xx < rowCount && yy > -1
  //         );
  //         if (checkresponse(response)) {
  //           actions.setResult(response.result);
  //           won = true;
  //         }
  //       }
  //     }
  //   }

  //   return won;
  // };

  // const changePlayer = player => {
  //   actions.setCurrentPlayer(player);
  // };

  // const stopGame = () => {
  //   actions.setStatusMatch(false);
  // };

  // const chooseCell = (x, y) => {
  //   actions.outTurn();

  //   const board = cloneBoard(boardStates[currentBoardState.boardOrder].board);
  //   board[x][y] = symbol;

  //   actions.addNewBoardState({
  //     board,
  //     cell: {
  //       rowOrder: x,
  //       colOrder: y
  //     },
  //     myTurn: false
  //   });

  //   actions.setCurrentBoardState({
  //     boardOrder: currentBoardState.boardOrder + 1
  //   });

  //   if (isWinner(board, x, y)) {
  //     stopGame();
  //     actions.setWinner(currentPlayer);
  //   } else {
  //     changePlayer(currentPlayer === 'X' ? 'O' : 'X');
  //   }
  // };

  // const startGame = () => {
  //   actions.setResult([]);
  //   initBoard(rowCount, colCount);
  //   actions.setStatusMatch(true);
  //   actions.setCurrentPlayer('X');
  // };

  // const restartGame = () => {
  //   actions.setResult([]);
  //   actions.setBoardStates([]);
  //   initBoard(rowCount, colCount);
  //   startGame();
  // };

  // if (!boardIsInited) {
  //   initBoard(rowCount, colCount);
  // }

  return null;
  // <>
  //   <div className="caro-game">
  //     <div className="caro-game__left-section">
  //       <div className="caro-game__left-section__players">
  //         <div />
  //       </div>
  //       <CaroGameBoard
  //         className="caro-game__board"
  //         rowCount={rowCount}
  //         colCount={colCount}
  //         chooseCell={chooseCell}
  //       />
  //     </div>
  //     <div className="caro-game__right-section">
  //       <CaroGameHistory className="caro-game__history" />
  //     </div>
  //     {/* <CaroGamePrepare
  //       className="caro-game__prepare"
  //       startGame={startGame}
  //       stopGame={stopGame}
  //       restartGame={restartGame}
  //     /> */}

  //     {/* <CaroGameHistory
  //       className="caro-game__history"
  //       switchBoardState={switchBoardState}
  //     /> */}
  //   </div>
  //   {/* {winner ? (
  //     <div className="notification">
  //       <div className="notification__content">
  //         <span>
  //           Congratulate!!! {winner === 'X' ? XPlayer : OPlayer} won.
  //         </span>
  //         <button type="button" onClick={() => actions.setWinner(null)}>
  //           Ok
  //         </button>
  //       </div>
  //     </div>
  //   ) : null} */}
  // </>
}

const mapStateToProps = state => ({
  XPlayer: get(state, ['gameReducer', 'XPlayer']),
  OPlayer: get(state, ['gameReducer', 'OPlayer']),
  winner: get(state, ['gameReducer', 'winner']),
  boardStates: get(state, ['gameReducer', 'boardStates']),
  currentBoardState: get(state, ['gameReducer', 'currentBoardState']),
  currentPlayer: get(state, ['gameReducer', 'currentPlayer'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setWinner: gameActions.setWinner,
        setBoardStates: gameActions.setBoardStates,
        setCurrentBoardState: gameActions.setCurrentBoardState,
        setResult: gameActions.setResult,
        setStatusMatch: gameActions.setStatusMatch,
        setCurrentPlayer: gameActions.setCurrentPlayer
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
