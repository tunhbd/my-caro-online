import React, { useState } from 'react';
import './CaroGameHistory.styles.css';

export default function CaroGameHistory(props) {
  const [ascSort, sortAsc] = useState(true);
  const boardStateCount = props.boardStates.length;

  // console.log('current state', props.currentBoardState);
  // console.log('board state count', boardStateCount);
  // console.log('board states', props.boardStates);
  console.log('ascSort', ascSort);
  return (
    <div className={props.className}>
      <div className="history-sort">
        <button
          style={{ opacity: ascSort ? '1' : '0.5' }}
          onClick={() => sortAsc(true)}
        >
          A-Z
        </button>
        <button
          style={{ opacity: !ascSort ? '1' : '0.5' }}
          onClick={() => sortAsc(false)}
        >
          Z-A
        </button>
      </div>
      <ul className="history">
        {
          (ascSort ? props.boardStates : [...props.boardStates].reverse()).map((state, index) => {
            return (<li
              key={ascSort ? index : boardStateCount - 1 - index}
              className={`history__item ${(ascSort ? index : boardStateCount - 1 - index) === props.currentBoardState.boardOrder ? 'current' : ''}`}
              onClick={() => props.switchBoardState(ascSort ? index : props.boardStates.length - 1 - index)}
            >
              {
                state.cell.rowOrder && state.cell.colOrder
                  ? `Fill ${state.cell.rowOrder} X ${state.cell.colOrder}`
                  : 'Begin'
              }

            </li>);
          })
        }

      </ul>
    </div>
  );
}