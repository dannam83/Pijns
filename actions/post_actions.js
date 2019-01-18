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

export const postCreateSave = ({ postText, author }) => {
  const db = firebase.database();
  const userRef = db.ref(`/users/${author.id}/posts`);
  const postRef = db.ref('/posts');
  const key = userRef.push().getKey();

  return (dispatch) => {
    saveToFirebase(userRef, postRef, key, author, postText)
    .then(() => dispatch({ type: POST_CREATE_SAVE })
    );
  };
};

const saveToFirebase = async (userRef, postRef, key, author, content) => {
  await userRef.child(key).set({ author, content, notes: 0 });
  await postRef.child(key).set({ author, content });
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
        dispatch({ type: POSTS_FETCH_SUCCESS, payload: snapshot.val() }
        );
      }
    );
  };
};

export const addNote = async (postId) => {
  const { uid } = firebase.auth().currentUser;
  const db = firebase.database();
  const usersRef = await db.ref(`/users/${uid}/posts/${postId}/notes/count`);
  const postsRef = await db.ref(`/posts/${postId}/notes/count`);

  usersRef.transaction((currentCount) => (currentCount || 0) + 1);
  postsRef.transaction((currentCount) => (currentCount || 0) + 1);
};
