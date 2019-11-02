import * as actionTypes from '../actions/action-types';

const initStates = {
  token: null,
  profile: null,
  signInSuccess: false,
  isProcessAuth: false,
  authMessage: null,
  isChangePassword: false
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.CHECK_AUTHORIZATED_SUCCESS:
      return {
        ...state,
        token: payload.token
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        authMessage: null
      };
    case actionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        token: null,
        authMessage: payload.message
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: true,
        authMessage: null
      };
    case actionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        signUpSuccess: false,
        authMessage: payload.message
      };
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.profile
      };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload.profile
        }
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        profile: null,
        token: null
      };
    case actionTypes.SIGN_IN_VIA_SOCIAL_SUCCESS:
      return {
        ...state,
        token: payload.token
      };
    case actionTypes.SIGN_IN_VIA_SOCIAL_FAILED:
      return {
        ...state,
        token: null
      };
    case actionTypes.PROCESS_AUTH:
      return {
        ...state,
        isProcessAuth: true
      };
    case actionTypes.PROCESS_AUTH_DONE:
      return {
        ...state,
        isProcessAuth: false
      };
    case actionTypes.OPEN_CHANGE_PASSWORD_DIALOG:
      return {
        ...state,
        isChangePassword: true
      };
    case actionTypes.CLOSE_CHANGE_PASSWORD_DIALOG:
      return {
        ...state,
        isChangePassword: false
      };
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangePassword: false
      };
    default:
      return state || initStates;
  }
};

export default authReducer;
