import React, { useState } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';

import CaroGameBoardRow from './row';
import { gameActions } from '../../../actions';
import './board.styles.css';

function CaroGameBoard(props) {
  const [initedBoard, alreadyInitBoard] = useState(false);
  const {
    rowCount,
    colCount,
    chooseCell,
    boardStates,
    currentBoardState,
    className,
    actions
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

    actions.addNewBoardState({
      cell: {
        rowOrder: null,
        colOrder: null
      },
      board,
      myTurn: false
    });

    actions.setCurrentBoardState({
      boardOrder: 0
    });
    alreadyInitBoard(true);
  };

  if (!initedBoard) {
    initBoard(rowCount, colCount);
  }

  const board = boardStates[currentBoardState.boardOrder]
    ? boardStates[currentBoardState.boardOrder].board
    : [];
  console.log('board', board);
  const renderBoardRows = () => {
    let rows = null;

    for (let rowOrder = 0; rowOrder < rowCount; rowOrder += 1) {
      rows = (
        <>
          {rows}
          <CaroGameBoardRow
            colCount={colCount}
            rowOrder={rowOrder}
            row={board[rowOrder]}
            chooseCell={chooseCell}
          />
        </>
      );
    }

    return rows;
  };

  return (
    <>
      {board.length === 0 ? (
        <Spin size="large" />
      ) : (
        <div className={className}>
          <div className="caro-game__board__content">{renderBoardRows()}</div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  boardStates: get(state, ['gameReducer', 'boardStates']),
  currentBoardState: get(state, ['gameReducer', 'currentBoardState'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addNewBoardState: gameActions.addNewBoardState,
        setCurrentBoardState: gameActions.setCurrentBoardState
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaroGameBoard);
