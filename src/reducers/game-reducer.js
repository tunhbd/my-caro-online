import * as actionTypes from '../actions/action-types';

const initStates = {
  // XPlayer: null,
  // OPlayer: null,
  // winner: null,
  fighting: false,
  result: [],
  isPlaying: false,
  // currentPlayer: null,
  boardStates: [],
  currentBoardState: {
    boardOrder: -1,
    myTurn: false
  },
  playOnline: false,
  IAmReady: false,
  findingPlayer: false,
  vsPlayer: null,
  playerReady: false,
  room: null,
  myTurn: false,
  symbol: null,
  chatMessages: [],
  notifyResult: false,
  isWinner: false,
  isRequestingPlayer: false
};

const gameReducer = (state, { type, payload }) => {
  switch (type) {
    // case actionTypes.SET_X_PLAYER:
    //   return {
    //     ...state,
    //     XPlayer: payload.playerName
    //   };
    // case actionTypes.SET_O_PLAYER:
    //   return {
    //     ...state,
    //     OPlayer: payload.playerName
    //   };
    // case actionTypes.SET_CURRENT_PLAYER:
    //   return {
    //     ...state,
    //     currentPlayer: payload.player
    //   };
    // case actionTypes.SET_BOARD_STATES:
    //   return {
    //     ...state,
    //     boardStates: payload.boardStates
    //   };
    case actionTypes.ADD_NEW_BOARD_STATE:
      return {
        ...state,
        boardStates: [...state.boardStates, payload.boardState]
      };
    case actionTypes.SET_CURRENT_BOARD_STATE:
      return {
        ...state,
        currentBoardState: payload.currentBoardState
      };
    // case actionTypes.SET_WINNER:
    //   return {
    //     ...state,
    //     winner: payload.winner
    //   };
    // case actionTypes.SET_STATUS_MATCH:
    //   return {
    //     ...state,
    //     isPlaying: payload.status
    //   };
    case actionTypes.SET_RESULT:
      return {
        ...state,
        result: payload.result
      };
    case actionTypes.START_GAME:
      return {
        ...state,
        isPlaying: true
      };
    case actionTypes.STOP_GAME:
      return {
        ...state,
        isPlaying: false
      };
    case actionTypes.IN_TURN:
      return {
        ...state,
        myTurn: true
      };
    case actionTypes.OUT_TURN:
      return {
        ...state,
        myTurn: false
      };
    case actionTypes.UPDATE_ROOM:
      return {
        ...state,
        room: payload.room
      };
    case actionTypes.FIND_PLAYER:
      return {
        ...state,
        findingPlayer: true
      };
    case actionTypes.FIND_PLAYER_DONE:
      return {
        ...state,
        findingPlayer: false
      };
    case actionTypes.SET_PLAYER_SYMBOL:
      return {
        ...state,
        symbol: payload.symbol
      };
    case actionTypes.PLAY_ONLINE:
      return {
        ...state,
        playOnline: true
      };
    case actionTypes.PLAY_WITH_COMPUTER:
      return {
        ...state,
        playOnline: false
      };
    case actionTypes.UPDATE_VS_PLAYER:
      return {
        ...state,
        vsPlayer: payload.player
      };
    case actionTypes.PLAYER_READY:
      return {
        ...state,
        playerReady: true
      };
    case actionTypes.I_AM_READY:
      return {
        ...state,
        IAmReady: true
      };
    case actionTypes.REPLACE_TURN_FIRST_BOARD_STATE:
      return {
        ...state,
        boardStates: [
          {
            ...state.boardStates[0],
            myTurn: payload.status
          },
          ...state.boardStates.slice(1, state.boardStates.length)
        ]
      };
    case actionTypes.ADD_CHAT_MESSAGE:
      return {
        ...state,
        chatMessages: [...state.chatMessages, payload.msg]
      };
    case actionTypes.RESET_GAME_STATE:
      return {
        ...state,
        isPlaying: false,
        boardStates: [state.boardStates[0]],
        currentBoardState: {
          boardOrder: 0,
          myTurn: false
        },
        findingPlayer: false,
        vsPlayer: null,
        playerReady: false,
        IAmReady: false,
        myTurn: false,
        chatMessages: [],
        result: [],
        room: null,
        symbol: null,
        notifyResult: false,
        isWinner: false
      };
    case actionTypes.NOTIFY_WINNER:
      return {
        ...state,
        notifyResult: true,
        isWinner: true,
        isDraw: false
      };
    case actionTypes.NOTIFY_LOSER:
      return {
        ...state,
        notifyResult: true,
        isWinner: false,
        isDraw: false
      };
    case actionTypes.SLICE_BOARD_STATES:
      return {
        ...state,
        boardStates: state.boardStates.slice(payload.start, payload.end)
      };
    case actionTypes.REQUEST_PLAYER:
      return {
        ...state,
        isRequestingPlayer: true
      };
    case actionTypes.REQUEST_PLAYER_DONE:
      return {
        ...state,
        isRequestingPlayer: false
      };
    case actionTypes.NOTIFY_DRAW:
      return {
        ...state,
        notifyResult: true,
        isDraw: true,
        isWinner: false
      };
    default:
      return state || initStates;
  }
};

export default gameReducer;
