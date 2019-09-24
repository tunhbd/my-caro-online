import React from 'react';
import './CaroGameHistory.styles.css';

export default function CaroGameHistory(props) {
  return (
    <div className={props.className}>
      <ul className="history">
        {
          props.boardStates.map((state, index) => {
            return (<li
              key={index}
              className="history__item"
              onClick={() => props.switchBoardState(index)}
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