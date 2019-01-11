import { AsyncStorage } from 'react-native';
import { Facebook, Google } from 'expo';
import firebase from 'firebase';

import {
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from './types';

export const alreadyLoggedIn = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  }
};

export const fbLogin = (redirect) => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    await doFbLogin(dispatch);
    redirect();
  }
};

const doFbLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('309296216371741', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FB_LOGIN_FAIL });
  }

// Build Firebase credential with the Facebook access token.
  const credential = firebase.auth.FacebookAuthProvider.credential(token);

// Sign in with credential from the Facebook user.
  firebase.auth().signInWithCredential(credential).catch((error) => {
// Handle Errors here.
    console.warn(error);
  });

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
};

export const googleLogin = (redirect) => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    await doGoogleLogin(dispatch);
    redirect();
  }
};

const doGoogleLogin = async dispatch => {
  let { type, accessToken } = await Google.logInAsync({
    androidClientId: '800234801651-eo6nj683dgn5b8otcpft96k3itfbe5in.apps.googleusercontent.com',
    iosClientId: '800234801651-00t8f3m9ju45hmt3fj5jorduolmjpjie.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  if (type === 'cancel') {
    return dispatch({ type: FB_LOGIN_FAIL });
  }

// Build Firebase credential with the Facebook access token.
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

// Sign in with credential from the Facebook user.
  firebase.auth().signInWithCredential(credential).catch((error) => {
// Handle Errors here.
    console.warn(error);
  });

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
};

export const logout = (redirect) => async dispatch => {
  await AsyncStorage.removeItem('fb_token');
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: LOGOUT_FAIL, payload: token });
  } else {
    dispatch({ type: LOGOUT_SUCCESS });
  }

  redirect();
};
