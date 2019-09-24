import React from 'react';
import './CaroGameBoardCell.styles.css';

export default function CaroGameBoardCell(props) {
  const { rowOrder, colOrder, isPlaying, chooseCell, cell } = props;

  const onClickOnCell = () => {
    if (isPlaying) {
      if (!cell) {
        chooseCell(rowOrder, colOrder);
      }
    }
  }

  return (
    <div
      className="caro-game__board__row__col"
      onClick={onClickOnCell}
    >
      {cell ? cell : null}
    </div>
  );
}