import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import axios from 'axios';

import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOGIN } from './types';

export const doFbLogin = async dispatch => {
  try {
    let { type, token } = await fbLoginWithPermissions();
    if (type === 'cancel') {
      return dispatch({ type: LOGIN_FAIL });
    }

    await firebaseFbLogin(token);

    let { data } = await fetchFbProfileData(token);
    await setUserSliceOfState(data, dispatch);
    // const { uid, photoURL } = firebase.auth().currentUser;
    // await saveUserProfile(data, photoURL, uid);
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
  const { name, birthday, email, gender } = data;
  await firebase.database().ref(`/users/${uid}/profile`)
    .set({ name, displayName: name, birthday, email, gender, picture }
  );
  await firebase.database().ref(`/userSearch/${uid}/`)
    .set({ name, searchName: name.toLowerCase(), picture }
  );
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
