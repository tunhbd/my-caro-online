import React from 'react';
import CaroGameBoardCol from '../CaroGameBoardCol/CaroGameBoardCol';
import './CaroGameBoardRow.styles.css';

export default function CaroGameBoardRow(props) {
  const { colCount, fillCol, row, isPlaying, board } = props;

  const renderBoardCols = () => {
    let cols = null;

    for (let col = 1; col <= colCount; col++) {
      cols = (
        <React.Fragment>
          {cols}
          <CaroGameBoardCol
            row={row}
            col={col}
            isPlaying={isPlaying}
            board={board}
            fillCol={fillCol}
          />
        </React.Fragment>
      );
    }

    return cols;
  }

  return (
    <div className='caro-game__board__row'>
      {renderBoardCols()}
    </div>
  );
}