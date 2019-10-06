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
  }
};

const reducers = (state, action) => {
  switch (action.type) {
    default:
      return state || initStates;
  }
};
export default reducers;
