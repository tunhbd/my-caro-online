import React, { useState } from 'react';
import './CaroGameHistory.styles.css';

export default function CaroGameHistory(props) {
  const { boardStates, className } = props;
  const [ascSort, sortAsc] = useState(true);
  const boardStateCount = boardStates.length;

  return (
    <div className={className}>
      <div className="history-sort">
        <button
          type="button"
          style={{ opacity: ascSort ? '1' : '0.5' }}
          onClick={() => sortAsc(true)}
        >
          A-Z
        </button>
        <button
          type="button"
          style={{ opacity: !ascSort ? '1' : '0.5' }}
          onClick={() => sortAsc(false)}
        >
          Z-A
        </button>
      </div>
      <ul className="history">
        {(ascSort ? boardStates : [...boardStates].reverse()).map(
          (state, index) => {
            return (
              <li
                key={ascSort ? index : boardStateCount - 1 - index}
                className={`history__item ${
                  (ascSort ? index : boardStateCount - 1 - index) ===
                  props.currentBoardState.boardOrder
                    ? 'current'
                    : ''
                }`}
                onClick={() =>
                  props.switchBoardState(
                    ascSort ? index : props.boardStates.length - 1 - index
                  )
                }
              >
                {state.cell.rowOrder && state.cell.colOrder
                  ? `Fill ${state.cell.rowOrder} X ${state.cell.colOrder}`
                  : 'Begin'}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
