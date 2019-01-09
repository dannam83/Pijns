import {
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FB_LOGIN_SUCCESS:
      return { token: action.payload };
    case FB_LOGIN_FAIL:
      return { token: null };
    case LOGOUT_SUCCESS:
      return { token: null };
    case LOGOUT_FAIL:
      return { token: action.payload };
    default:
      return state;
  }
}
