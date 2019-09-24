import React from 'react';
import CaroGameBoardCell from '../CaroGameBoardCell/CaroGameBoardCell';
import './CaroGameBoardRow.styles.css';

export default function CaroGameBoardRow(props) {
  const { colCount, chooseCell, row, isPlaying, rowOrder } = props;

  const renderBoardCols = () => {
    let cols = null;

    for (let colOrder = 0; colOrder < colCount; colOrder++) {
      cols = (
        <React.Fragment>
          {cols}
          <CaroGameBoardCell
            rowOrder={rowOrder}
            colOrder={colOrder}
            isPlaying={isPlaying}
            cell={row[colOrder]}
            chooseCell={chooseCell}
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