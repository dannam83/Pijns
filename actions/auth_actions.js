import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

import {
  LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT_SUCCESS, LOGOUT_FAIL,
  USER_FOUND
} from './types';
import { doFbLogin } from './auth_facebook_actions';

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
    await dispatch({ type: LOGIN_FAIL, payload: token });
  }
};

export const fbLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('auth_token');

  if (token) {
    fetchUserData(dispatch);
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

const fetchUserData = async dispatch => {
  let ref = await firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`);

  await ref.once('value', snapshot => {
      let { name, picture } = snapshot.val();
      dispatch({ type: USER_FOUND, name, picture, isNew: false });
  });
};
