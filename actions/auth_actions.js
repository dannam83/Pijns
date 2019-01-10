import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
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

export const fbLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    doFbLogin(dispatch);
  }
};

export const firebaseFacebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    doFirebaseFacebookLogin(dispatch);
  }
};

const doFirebaseFacebookLogin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  console.log(provider);
  firebase.auth().signInWithRedirect(provider);
};
//
// firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const token = result.credential.accessToken;
//     // ...
//   }
//   // The signed-in user info.
//   const user = result.user;
// }).catch(function(error) {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   const credential = error.credential;
//   // ...
// });

const doFbLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('309296216371741', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FB_LOGIN_FAIL });
  }

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
