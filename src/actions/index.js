import * as actionTypes from './action-types';
import { RestClient } from '../rest-client/rest-client';
import { updateCookie, getCookie } from '../utils/cookies';

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

export const signIn = (username, password) => async dispatch => {
  const client = new RestClient();

  client
    .asyncPost('/user/login', {
      username,
      password
    })
    .then(res => {
      // console.log('resres', res);
      if (res.token) {
        updateCookie('token', res.token);
        console.log('coki token', getCookie('token'));
        dispatch(signInSuccess(res.token));
      } else {
        dispatch(signInFailed());
      }
    })
    .catch(err => {
      dispatch(signInFailed());
    });
};

export const signInSuccess = token => ({
  type: actionTypes.SIGN_IN_SUCCESS,
  payload: { token }
});

export const signInFailed = () => ({
  type: actionTypes.SIGN_IN_FAILED,
  payload: {}
});

export const signUp = data => async dispatch => {
  const client = new RestClient();

  client
    .asyncPost('/user/register', data)
    .then(res => {
      if (res.success) {
        dispatch(signUpSuccess());
      }
    })
    .catch(err => {
      dispatch(signUpFailed());
    });
};

export const signUpSuccess = () => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  payload: {}
});

export const signUpFailed = () => ({
  type: actionTypes.SIGN_UP_FAILED,
  payload: {}
});

export const signOut = () => ({
  type: actionTypes.SIGN_OUT,
  payload: {}
});

// export const getProfile = () => dispatch => {
//   const client = new RestClient();

//   client
//   .asyncGet('/user/me')
//   .then(res => {

//   })
//   .catch(err => {
//     dispatch(getProfileFailed());
//   })
// }
