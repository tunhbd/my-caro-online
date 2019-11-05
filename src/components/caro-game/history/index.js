import React, { useState } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';

import './history.styles.css';
import { gameActions } from '../../../actions';

function CaroGameHistory(props) {
  const { boardStates, currentBoardState } = props;
  const [ascSort, sortAsc] = useState(true);
  const boardStateCount = boardStates.length;

  const switchBoardState = boardOrder => {
    props.actions.setCurrentBoardState({ boardOrder });
  };

  return (
    <div className="history-container">
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
                  currentBoardState.boardOrder
                    ? 'current'
                    : ''
                }`}
                onClick={() =>
                  switchBoardState(
                    ascSort ? index : boardStates.length - 1 - index
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

const mapStateToProps = state => ({
  boardStates: get(state, ['gameReducer', 'boardStates']),
  currentBoardState: get(state, ['gameReducer', 'currentBoardState'])
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setCurrentBoardState: gameActions.setCurrentBoardState
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaroGameHistory);
