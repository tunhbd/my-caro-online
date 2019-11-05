import * as actionTypes from './action-types';
// import { RestClient } from '../rest-client/rest-client';

// export const setXPlayer = playerName => ({
//   type: actionTypes.SET_X_PLAYER,
//   payload: {
//     playerName
//   }
// });

// export const setOPlayer = playerName => ({
//   type: actionTypes.SET_O_PLAYER,
//   payload: { playerName }
// });

// export const setCurrentPlayer = player => ({
//   type: actionTypes.SET_CURRENT_PLAYER,
//   payload: { player }
// });

// export const setWinner = winner => ({
//   type: actionTypes.SET_WINNER,
//   payload: { winner }
// });

// export const setStatusMatch = status => ({
//   type: actionTypes.SET_STATUS_MATCH,
//   payload: { status }
// });

// export const setBoardStates = boardStates => ({
//   type: actionTypes.SET_BOARD_STATES,
//   payload: { boardStates }
// });

export const addNewBoardState = boardState => ({
  type: actionTypes.ADD_NEW_BOARD_STATE,
  payload: { boardState }
});

export const setCurrentBoardState = currentBoardState => ({
  type: actionTypes.SET_CURRENT_BOARD_STATE,
  payload: { currentBoardState }
});

export const startGame = () => ({
  type: actionTypes.START_GAME,
  payload: {}
});

export const stopGame = () => ({
  type: actionTypes.STOP_GAME,
  payload: {}
});

export const setResult = result => ({
  type: actionTypes.SET_RESULT,
  payload: { result }
});

export const inTurn = () => ({
  type: actionTypes.IN_TURN,
  payload: {}
});

export const outTurn = () => ({
  type: actionTypes.OUT_TURN,
  payload: {}
});

export const updateRoom = room => ({
  type: actionTypes.UPDATE_ROOM,
  payload: { room }
});

export const findPlayer = () => ({
  type: actionTypes.FIND_PLAYER,
  payload: {}
});

export const findPlayerDone = () => ({
  type: actionTypes.FIND_PLAYER_DONE,
  payload: {}
});

export const setPlayerSymbol = symbol => ({
  type: actionTypes.SET_PLAYER_SYMBOL,
  payload: { symbol }
});

// export const fighting = () => ({
//   type: actionTypes.FIGHTING,
//   payload: {}
// });

export const playWithComputer = () => ({
  type: actionTypes.PLAY_WITH_COMPUTER,
  payload: {}
});

export const playOnline = () => ({
  type: actionTypes.PLAY_ONLINE,
  payload: {}
});

export const IAmReady = () => ({
  type: actionTypes.I_AM_READY,
  payload: {}
});

export const playerReady = () => ({
  type: actionTypes.PLAYER_READY,
  payload: {}
});

export const updateVsPlayer = player => ({
  type: actionTypes.UPDATE_VS_PLAYER,
  payload: { player }
});

export const replaceTurnFirstBoardState = status => ({
  type: actionTypes.REPLACE_TURN_FIRST_BOARD_STATE,
  payload: { status }
});

export const addChatMessage = msg => ({
  type: actionTypes.ADD_CHAT_MESSAGE,
  payload: { msg }
});

export const resetGameState = () => ({
  type: actionTypes.RESET_GAME_STATE,
  payload: {}
});

export const notifyWinner = () => ({
  type: actionTypes.NOTIFY_WINNER,
  payload: {}
});

export const notifyLoser = () => ({
  type: actionTypes.NOTIFY_LOSER,
  payload: {}
});

export const sliceBoardStates = (start, end) => ({
  type: actionTypes.SLICE_BOARD_STATES,
  payload: { start, end }
});
