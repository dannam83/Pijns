import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
import axios from 'axios';

import { LOGIN_SUCCESS, LOGIN_FAIL_FB, USER_LOGIN } from './types';

export const doFbLogin = async dispatch => {
  try {
    let { type, token } = await fbLoginWithPermissions();
    if (type === 'cancel') {
      return dispatch({ type: LOGIN_FAIL_FB });
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
    permissions: ['public_profile', 'email'] })
);

const fetchFbProfileData = async (token) => (
  await axios.get(
    `https://graph.facebook.com/me?access_token=${
      token}&fields=id,name,email,picture.type(large)`
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
      const isNew = !snapshot.val() || snapshot.val().profile.isNew;
      if (!snapshot.val()) {
        AsyncStorage.setItem('user_feed', JSON.stringify({}));
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
  const { name, email } = data;
  await firebase.database().ref(`/users/${uid}/profile`)
    .set({ name, displayName: name, email, picture }
  );
  await firebase.database().ref(`/userSearch/${uid}/`)
    .set({ name, searchName: name.toLowerCase(), picture }
  );
  await firebase.database().ref(`/users/${uid}/posts`).set(0);

  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );
  await firebase.database().ref(`/userPijns/${uid}/${currentDate}/${uid}`).set('INITIALIZED');
  await firebase.database().ref(`/pinboards/${uid}/${uid}`).set('INITIALIZED');
  await firebase.database().ref(`/friends/${uid}/${uid}/status`).set('INITIALIZED');
  await firebase.database().ref(`/notifications/${uid}`).set('INITIALIZED');
};

const updateUserProfile = async (data, picture, uid) => {
  const { name, email } = data;
  await firebase.database().ref(`/users/${uid}/profile`)
    .update({ name, email, picture, isNew: null }
  );
  await firebase.database().ref(`/userSearch/${uid}/`)
    .update({ name, picture }
  );
};
