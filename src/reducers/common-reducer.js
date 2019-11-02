import * as actionTypes from '../actions/action-types';

const initStates = {
  isProcessing: false,
  error: null,
  systemMessage: null
};

export default (state = initStates, { type, payload }) => {
  switch (type) {
    case actionTypes.PROCESS_SOMETHING:
      return {
        ...state,
        isProcessing: true
      };
    case actionTypes.PROCESS_SOMETHING_DONE:
      return {
        ...state,
        isProcessing: false
      };
    case actionTypes.NOTIFY_ERROR:
      return {
        ...state,
        error: payload.error
      };
    case actionTypes.NOTIFY_ERROR_DONE:
      return {
        ...state,
        error: null
      };
    case actionTypes.NOTITY_MESSAGE:
      return {
        ...state,
        systemMessage: {
          type: payload.type,
          message: payload.message
        }
      };
    case actionTypes.NOTITY_MESSAGE_DONE:
      return {
        ...state,
        systemMessage: null
      };
    default:
      return { ...state };
  }
};
