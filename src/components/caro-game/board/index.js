import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import CaroGameBoardRow from './row';
import './board.styles.css';

function CaroGameBoard(props) {
  const {
    rowCount,
    colCount,
    chooseCell,
    boardStates,
    currentBoardState,
    className
  } = props;

  const board = boardStates[currentBoardState.boardOrder]
    ? boardStates[currentBoardState.boardOrder].board
    : [];

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
    <div className={className}>
      <div className="caro-game__board__content">{renderBoardRows()}</div>
    </div>
  );
}

const mapStateToProps = state => ({
  boardStates: get(state, 'boardStates'),
  currentBoardState: get(state, 'currentBoardState')
});

export default connect(
  mapStateToProps,
  null
)(CaroGameBoard);
