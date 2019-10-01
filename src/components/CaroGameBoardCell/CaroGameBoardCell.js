/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  };

  const inResult = () => {
    return (
      result.findIndex(
        cellObj => cellObj.x === rowOrder && cellObj.y === colOrder
      ) > -1
    );
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`caro-game__board__row__col ${inResult() ? 'is-result' : ''}`}
      onClick={onClickOnCell}
    >
      {cell || null}
    </div>
  );
}
