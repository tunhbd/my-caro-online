import React from 'react';
import CaroGameBoardRow from '../CaroGameBoardRow/CaroGameBoardRow';
import './CaroGameBoard.styles.css';

export default function CaroGameBoard(props) {
  const { rowCount, colCount, isPlaying, fillCol, board } = props;

  const renderBoardRows = () => {
    let rows = null;

    for (let row = 1; row <= rowCount; row++) {
      rows = (
        <React.Fragment>
          {rows}
          <CaroGameBoardRow
            colCount={colCount}
            row={row}
            isPlaying={isPlaying}
            board={board}
            fillCol={fillCol}
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