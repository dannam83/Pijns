import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
import axios from 'axios';

import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOGIN } from './types';
import { getCurrentDate } from '../functions/common';

export const doFbLogin = async dispatch => {
  try {
    let { type, token } = await fbLoginWithPermissions();
    if (type === 'cancel') {
      return dispatch({ type: LOGIN_FAIL });
    }

    await firebaseFbLogin(token);

    let { data } = await fetchFbProfileData(token);
    await setUserSliceOfState(data, dispatch);
    await AsyncStorage.setItem('auth_token', token);
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } catch (err) {
    console.warn(err);
  }
};

const fbLoginWithPermissions = async () => (
  await Facebook.logInWithReadPermissionsAsync('309296216371741', {
    permissions: ['public_profile', 'email', 'user_birthday', 'user_gender']
  })
);

const fetchFbProfileData = async (token) => (
  await axios.get(
    `https://graph.facebook.com/me?access_token=${
      token}&fields=id,name,birthday,email,gender,picture.type(large)`
  )
);

const firebaseFbLogin = async (token) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(token);
    await firebase.auth().signInAndRetrieveDataWithCredential(credential);
};

const setUserSliceOfState = async (data, dispatch) => {
  let ref = await firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`);
  let { uid, displayName, photoURL } = firebase.auth().currentUser;
  await ref.once('value', snapshot => {
      const isNew = !snapshot.val();
      if (isNew) {
        saveUserProfile(data, photoURL, uid);
      } else {
        updateUserProfile(data, photoURL, uid);
      }
      dispatch({
        type: USER_LOGIN,
        uid,
        name: displayName,
        picture: photoURL,
        isNew
      });
  });
};

const saveUserProfile = async (data, picture, uid) => {
  const firstPost = {
    author: {
      id: 'YCxr13n1U4SzL5tgq1r8hD8vI8C2',
      name: 'Dan',
      picture: 'https://graph.facebook.com/10108634445933038/picture'
    },
    content: 'Welcome to PIJNs!',
    createdOn: getCurrentDate(),
    notes: {
      count: 0
    },
    timestamp: -Date.now(),
    type: 'prayerRequest'
  };

  const { name, birthday, email, gender } = data;
  await firebase.database().ref(`/users/${uid}/profile`)
    .set({ name, displayName: name, birthday, email, gender, picture }
  );
  await firebase.database().ref(`/userSearch/${uid}/`)
    .set({ name, searchName: name.toLowerCase(), picture }
  );
  await firebase.database().ref(`/users/${uid}/posts`).push(firstPost);

  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );
  await firebase.database().ref(`/userPijns/${uid}/${currentDate}/${uid}`).set('ready');
  await firebase.database().ref(`/pinboards/${uid}/${uid}`).set('ready');
  await firebase.database().ref(`/friends/${uid}/${uid}`).set('ready');
};

const updateUserProfile = async (data, picture, uid) => {
  const { name, birthday, email, gender } = data;
  await firebase.database().ref(`/users/${uid}/profile`)
    .update({ name, birthday, email, gender, picture }
  );
  await firebase.database().ref(`/userSearch/${uid}/`)
    .update({ name, picture }
  );
};
