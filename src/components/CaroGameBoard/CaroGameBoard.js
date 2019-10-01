import React from 'react';
import CaroGameBoardRow from '../CaroGameBoardRow/CaroGameBoardRow';
import './CaroGameBoard.styles.css';

export default function CaroGameBoard(props) {
  const {
    rowCount,
    colCount,
    isPlaying,
    chooseCell,
    board,
    result,
    className
  } = props;

  const renderBoardRows = () => {
    let rows = null;

    for (let rowOrder = 0; rowOrder < rowCount; rowOrder += 1) {
      rows = (
        <>
          {rows}
          <CaroGameBoardRow
            colCount={colCount}
            rowOrder={rowOrder}
            isPlaying={isPlaying}
            result={result}
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
