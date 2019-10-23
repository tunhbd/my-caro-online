import * as actionTypes from '../actions/action-types';

const initStates = {
  XPlayer: null,
  OPlayer: null,
  winner: null,
  result: [],
  isPlaying: false,
  currentPlayer: null,
  boardStates: [],
  currentBoardState: {
    boardOrder: -1,
    player: null
  },
  user: null,
  token: null,
  signInSuccess: false,
  signUpSuccess: false
};

const reducers = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_X_PLAYER:
      return {
        ...state,
        XPlayer: payload.playerName
      };
    case actionTypes.SET_O_PLAYER:
      return {
        ...state,
        OPlayer: payload.playerName
      };
    case actionTypes.SET_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: payload.player
      };
    case actionTypes.SET_BOARD_STATES:
      return {
        ...state,
        boardStates: payload.boardStates
      };
    case actionTypes.SET_CURRENT_BOARD_STATE:
      return {
        ...state,
        currentBoardState: payload.currentBoardState
      };
    case actionTypes.SET_WINNER:
      return {
        ...state,
        winner: payload.winner
      };
    case actionTypes.SET_STATUS_MATCH:
      return {
        ...state,
        isPlaying: payload.status
      };
    case actionTypes.SET_RESULT:
      return {
        ...state,
        result: payload.result
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: true,
        token: payload.token
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: true
      };
    case actionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload.user
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        user: null,
        signInSuccess: false,
        token: null
      };
    default:
      return state || initStates;
  }
};
export default reducers;
