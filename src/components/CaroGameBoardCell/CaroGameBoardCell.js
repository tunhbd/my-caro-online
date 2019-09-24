import React from 'react';
import './CaroGameBoardCell.styles.css';

export default function CaroGameBoardCell(props) {
  const { rowOrder, colOrder, isPlaying, chooseCell, cell, result } = props;

  const onClickOnCell = () => {
    if (isPlaying) {
      if (!cell) {
        chooseCell(rowOrder, colOrder);
      }
    }
  }

  const inResult = () => {
    return result.findIndex(cell => cell.x === rowOrder && cell.y === colOrder) > -1;
  }

  return (
    <div
      className={`caro-game__board__row__col ${inResult() ? 'is-result' : ''}`}
      onClick={onClickOnCell}
    >
      {cell ? cell : null}
    </div>
  );
}