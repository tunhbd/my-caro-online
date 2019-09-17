import React, { useState } from 'react';
import './CaroGameBoardCol.styles.css';

export default function CaroGameBoardCol(props) {
  const { row, col, isPlaying, fillCol, board } = props;

  const onClickOnCol = () => {
    if (isPlaying) {
      if (!board[row - 1][col - 1]) {
        fillCol(row, col);
      }
    }
  }

  return (
    <div
      className="caro-game__board__row__col"
      onClick={onClickOnCol}
    >
      {board[row - 1][col - 1] ? board[row - 1][col - 1].player : null}
    </div>
  );
}