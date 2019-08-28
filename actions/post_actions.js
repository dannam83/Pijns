import firebase from 'firebase';
import {
  POST_CREATE_UPDATE,
  POST_CREATE_SAVE,
  POST_EDIT_UPDATE,
  POSTS_FETCH_SUCCESS,
  POST_SAVE_SUCCESS,
  POST_APPEND,
  POST_DELETE,
  POST_SET_ACTIVE,
  POST_RESET_ACTIVE,
  POST_SHOW_DELETE_MODAL,
  POST_HIDE_DELETE_MODAL,
  POST_UNAVAILABLE,
  POST_UNAVAILABLE_CONFIRM
 } from './types';
import { getCurrentDate } from '../functions/common';
import { sendPrayerRequestNotifications } from '../api/notifications_api';

export const postCreateUpdate = ({ prop, value }) => {
  return {
    type: POST_CREATE_UPDATE,
    payload: { prop, value }
  };
};

export const postCreateSave = ({ postText, postType, author, user, friendList }) => {
  return (dispatch) => {
    saveToFirebase(author, postText, postType)
    .then(payload => {
      const { postId, content } = payload;
      sendPrayerRequestNotifications(user, postId, content, friendList);
      dispatch({ type: POST_CREATE_SAVE });
      dispatch({ type: POST_APPEND, payload });
    });
  };
};

const saveToFirebase = async (author, content, type) => {
  const db = firebase.database();
  const userRef = db.ref(`/users/${author.id}/posts`);
  const postRef = db.ref('/posts');
  const key = userRef.push().getKey();
  const createdOn = getCurrentDate();
  const timestamp = -Date.now();
  const post = { author, content, type, createdOn, timestamp, notes: 0, commentCount: 0 };

  await userRef.child(key).set(post);
  await postRef.child(key).set(post);
  return { ...post, postId: key };
};

export const postEditUpdate = ({ prop, value }) => {
  return {
    type: POST_EDIT_UPDATE,
    payload: { prop, value }
  };
};

export const postEditSave = ({ postText, postId }) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/posts/${postId}`).update({ content: postText });

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
  firebase.database().ref(`/posts/${postId}`).remove();
  firebase.database().ref(`/postComments/${postId}`).remove();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/posts/${postId}`)
      .remove()
      .then(() => {
        dispatch({ type: POST_DELETE });
    });
  };
};

export const showDeleteModal = () => { return ({ type: POST_SHOW_DELETE_MODAL }); };
export const hideDeleteModal = () => { return ({ type: POST_HIDE_DELETE_MODAL }); };

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

export const fetchActivePost = (postId) => {
  return (dispatch) => {
    firebase.database().ref(`/posts/${postId}`)
      .on('value', snapshot => {
        const post = snapshot.val();
        if (!post) {
          dispatch({
            type: POST_UNAVAILABLE
          });
        } else {
          post.postId = postId;
          dispatch({
            type: POST_SET_ACTIVE,
            payload: { id: postId, author: post.author, post }
          });
        }
      }
    );
  };
};

export const confirmPostUnavailable = () => ({ type: POST_UNAVAILABLE_CONFIRM });

export const resetActivePost = (postId) => {
  firebase.database().ref(`/posts/${postId}`).off();

  return ({
    type: POST_RESET_ACTIVE
  });
};

export const setActivePost = ({ postId, postAuthor }) => {
  return {
    type: POST_SET_ACTIVE,
    payload: { id: postId, author: postAuthor }
  };
};

export const answerPrayer = ({ postId, user }) => {
    const db = firebase.database();
    const answeredOn = getCurrentDate();

    db.ref(`/users/${user.uid}/posts/${postId}`)
      .update({ answered: answeredOn });
    db.ref(`/posts/${postId}`)
      .update({ answered: answeredOn });

    return {
      type: 'PRAYER_ANSWERED'
    };
};

export const unanswerPrayer = ({ postId, user }) => {
    const db = firebase.database();
    db.ref(`/users/${user.uid}/posts/${postId}`)
      .update({ answered: false });
    db.ref(`/posts/${postId}`)
      .update({ answered: false });

    return {
      type: 'PRAYER_UNANSWERED'
    };
};
