import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_FAIL_FB,
  LOGIN_FAIL_CONFIRM,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  USER_FOUND
} from '../actions/types';

const INITIAL_STATE = {
  loginFailModalVisible: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_FOUND:
      return { ...state, token: action.token };
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case LOGIN_FAIL:
      return { ...state, token: null };
    case LOGIN_FAIL_FB:
      return { token: null, loginFailModalVisible: true };
    case LOGIN_FAIL_CONFIRM:
      return { token: null, loginFailModalVisible: false };
    case LOGOUT_SUCCESS:
      return { ...state, token: null };
    case LOGOUT_FAIL:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
