import { AsyncStorage } from 'react-native';
import { Facebook, Google } from 'expo';
import firebase from 'firebase';
import axios from 'axios';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from './types';

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

const doFbLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('309296216371741', {
    permissions: ['public_profile', 'email', 'user_birthday', 'user_gender']
  });

  if (type === 'cancel') {
    return dispatch({ type: LOGIN_FAIL });
  }

  const credential = firebase.auth.FacebookAuthProvider.credential(token);

  try {
    await firebase.auth().signInAndRetrieveDataWithCredential(credential);
  } catch (err) {
    console.warn(err);
  }

  let fbProfile = await axios.get(
    `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,email,gender,picture.type(large)`
  );
  let { name, birthday, email, gender, picture } = fbProfile.data;

  await firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`)
    .set({ name, birthday, email, gender, picture: picture.data }
  );

  await AsyncStorage.setItem('auth_token', token);
  dispatch({ type: LOGIN_SUCCESS, payload: token });
};

export const googleLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('auth_token');

  if (token) {
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } else {
    await doGoogleLogin(dispatch);
  }
};

const doGoogleLogin = async dispatch => {
  let { type, accessToken } = await Google.logInAsync({
    androidClientId: '800234801651-eo6nj683dgn5b8otcpft96k3itfbe5in.apps.googleusercontent.com',
    iosClientId: '800234801651-00t8f3m9ju45hmt3fj5jorduolmjpjie.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  if (type === 'cancel') {
    console.log('cancelled');
    return dispatch({ type: LOGIN_FAIL });
  }

  const credential = firebase.auth.GoogleAuthProvider.credential(null, accessToken);

  firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
    console.warn(error);
  });

  await AsyncStorage.setItem('auth_token', accessToken);
  dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
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
