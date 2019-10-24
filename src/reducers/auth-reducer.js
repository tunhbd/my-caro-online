import * as actionTypes from '../actions/action-types';

const initStates = {
  token: null,
  profile: null,
  isProcessingAuth: false
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
        // signInSuccess: true,
        token: payload.token
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state
        // signUpSuccess: true
      };
    case actionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.profile
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        profile: null,
        // signInSuccess: false,
        token: null
      };
    default:
      return state || initStates;
  }
};

export default authReducer;
