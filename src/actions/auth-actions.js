import * as actionTypes from './action-types';
import { RestClient } from '../rest-client/rest-client';
import { updateCookie, getCookie, deleteCookie } from '../utils/cookies';
import { notifyError, notifyMessage } from './common-actions';
import { notityMessage } from '../utils/notification';

export const checkAuthorizated = () => dispatch => {
  const client = new RestClient();

  client.asyncGet('/user/check-authorizated').then(res => {
    if (res.error) {
      return dispatch(notifyError(res.error));
    }

    if (res.data.authorizated) {
      return dispatch(checkAuthorizatedSuccess(getCookie('token')));
    }

    return dispatch(checkAuthorizatedFailed());
  });
};

export const checkAuthorizatedSuccess = token => ({
  type: actionTypes.CHECK_AUTHORIZATED_SUCCESS,
  payload: { token }
});

export const checkAuthorizatedFailed = token => ({
  type: actionTypes.CHECK_AUTHORIZATED_FAILED,
  payload: {}
});

export const signIn = (username, password) => async dispatch => {
  dispatch(processAuth());
  const client = new RestClient();

  client
    .asyncPost('/user/login', {
      username,
      password
    })
    .then(res => {
      dispatch(processAuthDone());

      if (res.error) {
        return dispatch(notifyError(res.error));
      }

      if (res.data.token) {
        updateCookie('token', res.data.token);
        dispatch(signInSuccess(res.data.token));
      } else {
        dispatch(signInFailed('username or password is not correct'));
      }
    })
    .catch(err => {
      dispatch(processAuthDone());
      dispatch(notifyError(err));
    });
};

export const signInSuccess = token => ({
  type: actionTypes.SIGN_IN_SUCCESS,
  payload: { token }
});

export const signInFailed = message => ({
  type: actionTypes.SIGN_IN_FAILED,
  payload: { message }
});

export const signUp = data => async dispatch => {
  dispatch(processAuth());
  const client = new RestClient();

  client
    .asyncPost('/user/register', data)
    .then(res => {
      dispatch(processAuthDone());

      if (res.error) {
        return dispatch(notifyError(res.error));
      }

      if (res.data.success) {
        return dispatch(signUpSuccess());
      }

      return dispatch(signUpFailed('Register can not done'));
    })
    .catch(err => {
      dispatch(processAuthDone());
      dispatch(notifyError(err));
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

export const signOut = () => dispatch => {
  deleteCookie('token');
  dispatch(signOutSuccess());
};

export const signOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS,
  payload: {}
});

export const signOutFailed = () => ({
  type: actionTypes.SIGN_OUT_FAILED,
  payload: {}
});

export const signInViaSocial = (url, socialType) => dispatch => {
  window.open(
    url,
    socialType === 'FB' ? 'Facebook login' : 'Google login',
    'height=500,width=500,menubar=no,location=no,resizable=no,scrollbars=no,status=yes'
  );

  window.addEventListener('message', e => {
    const eventData = e.data;

    if (eventData.type === 'LOGIN_VIA_SOCIAL') {
      if (eventData.messageData.error || !eventData.messageData.data.token) {
        console.log(eventData.messageData.data.token);
        return dispatch(signInViaSocialFailed());
      }

      updateCookie('token', eventData.messageData.data.token);
      return dispatch(signInViaSocialSuccess(eventData.messageData.data.token));
    }
  });
};

export const signInViaSocialFailed = () => ({
  type: actionTypes.SIGN_IN_VIA_SOCIAL_FAILED,
  payload: {}
});

export const signInViaSocialSuccess = token => ({
  type: actionTypes.SIGN_IN_VIA_SOCIAL_SUCCESS,
  payload: { token }
});

export const fetchProfile = () => dispatch => {
  const client = new RestClient();

  client
    .asyncGet('/user/me')
    .then(res => {
      if (res.error) {
        dispatch(fetchProfileFailed());
        return dispatch(notifyError(res.error));
      }

      dispatch(fetchProfileSuccess(res.data.profile));
    })
    .catch(err => {
      return dispatch(fetchProfileFailed());
    });
};

export const fetchProfileFailed = () => ({
  type: actionTypes.FETCH_PROFILE_FAILED,
  payload: {}
});

export const fetchProfileSuccess = profile => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  payload: { profile }
});

export const updateProfile = data => async dispatch => {
  dispatch(processAuth());
  const client = new RestClient();

  await client
    .asyncPost('/user/me', data)
    .then(res => {
      dispatch(processAuthDone());
      if (res.error) {
        // return dispatch(notifyError(res.error));
        return notityMessage({
          type: 'ERROR',
          message: 'Have some error'
        });
      }

      if (res.data) {
        return dispatch(updateProfileSuccess(res.data.profile));
      }

      // dispatch(notifyError('Can not update your profile'));
      return notityMessage({
        type: 'ERROR',
        message: 'Can not update your profile'
      });
    })
    .catch(err => {
      dispatch(processAuthDone());
      // dispatch(notifyError(err));
      return notityMessage({
        type: 'ERROR',
        message: 'Have some error'
      });
    });
};

export const updateProfileSuccess = profile => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
  payload: { profile }
});

export const updateProfileFailed = () => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
  payload: {}
});

export const processAuth = () => ({
  type: actionTypes.PROCESS_AUTH,
  payload: {}
});

export const processAuthDone = () => ({
  type: actionTypes.PROCESS_AUTH_DONE,
  payload: {}
});

export const openChangePasswordDialog = () => ({
  type: actionTypes.OPEN_CHANGE_PASSWORD_DIALOG,
  payload: {}
});

export const closeChangePasswordDialog = () => ({
  type: actionTypes.CLOSE_CHANGE_PASSWORD_DIALOG,
  payload: {}
});

export const changePassword = password => async dispatch => {
  dispatch(processAuth());
  const client = new RestClient();

  await client
    .asyncPost('/user/change-password', { password })
    .then(res => {
      dispatch(processAuthDone());
      if (res.error) {
        // return dispatch(notifyMessage('ERROR', res.error));
        return notityMessage({
          type: 'ERROR',
          message: 'Having some error'
        });
      }

      if (res.data) {
        dispatch(changePasswordSuccess(res.data.profile));
        return notityMessage({
          type: 'SUCCESS',
          message: 'Change password successfully'
        });
        // return dispatch(notifyMessage('SUCCESS', 'Change password successfully'));
      }

      // dispatch(notifyMessage('ERROR', 'Can not update your profile'));
      notityMessage({
        type: 'ERROR',
        message: 'Can not change your password'
      });
    })
    .catch(err => {
      dispatch(processAuthDone());
      dispatch(notifyError(err));
    });
};

export const changePasswordSuccess = profile => ({
  type: actionTypes.CHANGE_PASSWORD_SUCCESS,
  payload: { profile }
});
