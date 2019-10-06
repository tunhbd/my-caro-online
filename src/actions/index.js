import * as actionTypes from './action-types';

export const setXPlayer = playerName => ({
  type: actionTypes.SET_X_PLAYER,
  payload: {
    playerName
  }
});

export const setOPlayer = playerName => ({
  type: actionTypes.SET_O_PLAYER,
  payload: { playerName }
});

export const setCurrentPlayer = player => ({
  type: actionTypes.SET_CURRENT_PLAYER,
  payload: { player }
});

export const setWinner = winner => ({
  type: actionTypes.SET_WINNER,
  payload: { winner }
});

export const setStatusMatch = status => ({
  type: actionTypes.SET_STATUS_MATCH,
  payload: { status }
});

export const setBoardStates = boardStates => ({
  type: actionTypes.SET_BOARD_STATES,
  payload: { boardStates }
});

export const setCurrentBoardState = currentBoardState => ({
  type: actionTypes.SET_CURRENT_BOARD_STATE,
  payload: { currentBoardState }
});

export const setResult = result => ({
  type: actionTypes.SET_RESULT,
  payload: { result }
});
