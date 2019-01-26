import firebase from 'firebase';
import {
  POST_CREATE_UPDATE,
  POST_CREATE_SAVE,
  POST_EDIT_UPDATE,
  POSTS_FETCH_SUCCESS,
  POST_SAVE_SUCCESS,
  POST_DELETE
 } from './types';

export const postCreateUpdate = ({ prop, value }) => {
  // const currentDate = new Date();
  // const month = currentDate.getMonth().toString();
  // const day = currentDate.getDay().toString();
  // const year = currentDate.getYear().toString();
  // const dateString = month + day + year;
  // console.log(dateString);

  return {
    type: POST_CREATE_UPDATE,
    payload: { prop, value }
  };
};

export const postCreateSave = ({ postText, author }) => {
  return (dispatch) => {
    saveToFirebase(author, postText)
    .then(() => dispatch({ type: POST_CREATE_SAVE })
    );
  };
};

const saveToFirebase = async (author, content) => {
  const db = firebase.database();
  const userRef = db.ref(`/users/${author.id}/posts`);
  const postRef = db.ref('/posts');
  const key = userRef.push().getKey();
  const createdOn = new Date().toString();
  const timestamp = -Date.now();

  await userRef.child(key).set({ author, content, createdOn, timestamp, notes: 0 });
  await postRef.child(key).set({ author, content, createdOn, timestamp, notes: 0 });
};

export const postEditUpdate = ({ prop, value }) => {
  return {
    type: POST_EDIT_UPDATE,
    payload: { prop, value }
  };
};

export const postEditSave = ({ postText, postId }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/posts/${postId}`)
      .update({ content: postText })
      .then(() => {
        dispatch({ type: POST_SAVE_SUCCESS });
      });
  };
};

export const postDelete = ({ postId }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/posts/${postId}`)
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
        console.log('fetch', snapshot.val());
        dispatch({ type: POSTS_FETCH_SUCCESS, payload: snapshot.val() }
        );
      }
    );
  };
};
