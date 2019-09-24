import React from 'react';
import CaroGameBoardRow from '../CaroGameBoardRow/CaroGameBoardRow';
import './CaroGameBoard.styles.css';

export default function CaroGameBoard(props) {
  const { rowCount, colCount, isPlaying, chooseCell, board } = props;

  const renderBoardRows = () => {
    let rows = null;

    for (let rowOrder = 0; rowOrder < rowCount; rowOrder++) {
      rows = (
        <React.Fragment>
          {rows}
          <CaroGameBoardRow
            colCount={colCount}
            rowOrder={rowOrder}
            isPlaying={isPlaying}
            row={board[rowOrder]}
            chooseCell={chooseCell}
          />
        </React.Fragment>
      )
    }

    return rows;
  }

  return (
    <div className={props.className}>
      <div className="caro-game__board__content">
        {renderBoardRows()}
      </div>
    </div>
  );
}