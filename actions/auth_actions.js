import { AsyncStorage } from 'react-native';

import {
  LOGIN_FAIL, LOGIN_FAIL_CONFIRM, LOGOUT_SUCCESS, LOGOUT_FAIL, USER_FOUND, FETCH_USER_FEED
} from './types';
import { doFbLogin } from './auth_facebook_actions';

export const fbLogin = () => async dispatch => {
  await doFbLogin(dispatch);
};

export const currentUserFound = (user) => async dispatch => {
  let token = await AsyncStorage.getItem('auth_token');

  if (token) {
    let { uid, displayName, photoURL } = user;
    let userFeed = await AsyncStorage.getItem('user_feed');

    try {
      dispatch({
        type: USER_FOUND, isNew: false, name: displayName, picture: photoURL, uid, token
      });
      dispatch({
        type: FETCH_USER_FEED, payload: JSON.parse(userFeed)
      });
    } catch (err) {
      console.warn(err);
    }
  } else {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const loginFailConfirm = () => dispatch => {
    dispatch({ type: LOGIN_FAIL_CONFIRM });
};

export const logout = (redirect) => async dispatch => {
  await AsyncStorage.removeItem('auth_token');
  let token = await AsyncStorage.getItem('auth_token');

  if (token) {
    dispatch({ type: LOGOUT_FAIL, payload: token });
  } else {
    AsyncStorage.removeItem('user_feed');
    dispatch({ type: LOGOUT_SUCCESS });
  }

  redirect('Auth');
};
