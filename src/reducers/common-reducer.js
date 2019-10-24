import * as actionTypes from '../actions/action-types';

const initStates = {
  isProcessingSomething: false
};

export default (state = initStates, { type, payload }) => {
  switch (type) {
    case actionTypes.PROCESS_SOMETHING:
      return {
        ...state,
        isProcessingSomething: true
      };
    case actionTypes.DONE_PROCESS_SOMETHING:
      return {
        ...state,
        isProcessingSomething: false
      };
    default:
      return { ...state };
  }
};
