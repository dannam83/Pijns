import { AsyncStorage } from 'react-native';

import {
  LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT_SUCCESS, LOGOUT_FAIL,
  USER_FOUND
} from './types';
import { doFbLogin } from './auth_facebook_actions';

export const fbLogin = () => async dispatch => {
  await doFbLogin(dispatch);
};

export const currentUserFound = (user) => async dispatch => {
  let token = await AsyncStorage.getItem('auth_token');

  if (token) {
    let { uid, displayName, photoURL } = user;
    try {
      await dispatch({
        type: USER_FOUND, uid, name: displayName, picture: photoURL, isNew: false
      });
      await dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (err) {
      console.warn(err);
    }
  } else {
    await dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = (redirect) => async dispatch => {
  await AsyncStorage.removeItem('auth_token');
  let token = await AsyncStorage.getItem('auth_token');

  if (token) {
    dispatch({ type: LOGOUT_FAIL, payload: token });
  } else {
    dispatch({ type: LOGOUT_SUCCESS });
  }

  redirect();
};
