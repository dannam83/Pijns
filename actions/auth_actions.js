import { AsyncStorage } from 'react-native';

import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL } from './types';
import { doFbLogin } from './auth_facebook_actions';

export const alreadyLoggedIn = () => async dispatch => {
  let token = await AsyncStorage.getItem('auth_token');

  if (token) {
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  }
};

export const fbLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('auth_token');

  if (token) {
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } else {
    await doFbLogin(dispatch);
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
