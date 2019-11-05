/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import './cell.styles.css';

function CaroGameBoardCell(props) {
  const {
    rowOrder,
    colOrder,
    isPlaying,
    chooseCell,
    cell,
    result,
    myTurn
  } = props;

  const onClickOnCell = () => {
    if (isPlaying && myTurn) {
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
    <div
      className={`caro-game__board__row__col ${inResult() ? 'is-result' : ''}`}
      onClick={onClickOnCell}
    >
      {cell || null}
    </div>
  );
}

const mapStateToProps = state => ({
  isPlaying: get(state, ['gameReducer', 'isPlaying']),
  result: get(state, ['gameReducer', 'result']),
  myTurn: get(state, ['gameReducer', 'myTurn'])
});

export default connect(
  mapStateToProps,
  null
)(CaroGameBoardCell);
