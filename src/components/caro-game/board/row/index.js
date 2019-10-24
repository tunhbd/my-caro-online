import React from 'react';
import CaroGameBoardCell from './cell';
import './row.styles.css';

export default function CaroGameBoardRow(props) {
  const { colCount, chooseCell, row, rowOrder } = props;

  const renderBoardCols = () => {
    let cols = null;

    for (let colOrder = 0; colOrder < colCount; colOrder += 1) {
      cols = (
        <>
          {cols}
          <CaroGameBoardCell
            rowOrder={rowOrder}
            colOrder={colOrder}
            cell={row[colOrder]}
            chooseCell={chooseCell}
          />
        </>
      );
    }

    return cols;
  };

  return <div className="caro-game__board__row">{renderBoardCols()}</div>;
}
