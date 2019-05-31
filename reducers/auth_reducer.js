import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  USER_FOUND
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_FOUND:
      return { token: action.token };
    case LOGIN_SUCCESS:
      return { token: action.payload };
    case LOGIN_FAIL:
      return { token: null };
    case LOGOUT_SUCCESS:
      return { token: null };
    case LOGOUT_FAIL:
      return { token: action.payload };
    default:
      return state;
  }
}
