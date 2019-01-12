import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';
import {
  POST_CREATE_UPDATE,
  POST_CREATE_SAVE,
  POST_EDIT_UPDATE,
  POSTS_FETCH_SUCCESS,
  POST_SAVE_SUCCESS,
  POST_DELETE
 } from './types';

export const postCreateUpdate = ({ prop, value }) => {
  return {
    type: POST_CREATE_UPDATE,
    payload: { prop, value }
  };
};

export const postCreateSave = ({ postText }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/posts`)
    .push({ postText })
    .then(() => {
      dispatch({ type: POST_CREATE_SAVE });
    });
  };
};

export const postEditUpdate = ({ prop, value }) => {
  return {
    type: POST_EDIT_UPDATE,
    payload: { prop, value }
  };
};

export const postEditSave = ({ postText, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/posts/${uid}`)
      .set({ postText })
      .then(() => {
        dispatch({ type: POST_SAVE_SUCCESS });
      });
  };
};

export const postDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/posts/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: POST_DELETE });
    });
  };
};

export const postsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/posts`)
      .on('value', snapshot => {
        dispatch({ type: POSTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
