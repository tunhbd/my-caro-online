import * as actionTypes from './action-types';

export const notifyError = error => ({
  type: actionTypes.NOTIFY_ERROR,
  payload: { error }
});

export const notifyErrorDone = () => ({
  type: actionTypes.NOTIFY_ERROR,
  payload: {}
});

export const processSomething = () => ({
  type: actionTypes.PROCESS_SOMETHING,
  payload: {}
});

export const processSomethingDone = () => ({
  type: actionTypes.PROCESS_SOMETHING_DONE,
  payload: {}
});

export const notifyMessage = (type, message) => ({
  type: actionTypes.NOTITY_MESSAGE,
  payload: { type, message }
});

export const notifyMessageDone = (type, message) => ({
  type: actionTypes.NOTITY_MESSAGE_DONE,
  payload: {}
});
