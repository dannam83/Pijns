import firebase from 'firebase';
import {
  POST_CREATE_UPDATE,
  POST_CREATE_SAVE,
  POST_EDIT_UPDATE,
  POSTS_FETCH_SUCCESS,
  POST_SAVE_SUCCESS,
  POST_DELETE,
  POST_SHOW_DELETE_MODAL,
  POST_HIDE_DELETE_MODAL,
  UPDATE_USER_FEED,
 } from './types';
import { getCurrentDate } from '../functions/common';
import { sendPrayerRequestNotifications } from '../api/notifications_api';

export const postCreateUpdate = ({ prop, value }) => {
  return {
    type: POST_CREATE_UPDATE,
    payload: { prop, value }
  };
};

export const postCreateSave = ({ postText, postType, visibleTo, author, user,
  friendList, taggedFriends
}) => {
  return (dispatch) => {
    const post = { author, content: postText, type: postType, visibleTo, taggedFriends };
    saveToFirebase(post)
    .then(payload => {
      const { postId, content } = payload;
      sendPrayerRequestNotifications({
        user, postId, content, friendList, visibleTo, taggedFriends
      });
      dispatch({ type: POST_CREATE_SAVE });
    });
  };
};

const saveToFirebase = async (post) => {
  const { author } = post;
  const db = firebase.database();
  const userRef = db.ref(`/users/${author.id}/posts`);
  const postRef = db.ref('/posts');
  const key = userRef.push().getKey();
  const createdOn = getCurrentDate();
  const timestamp = -Date.now();
  const fullPost = { ...post, createdOn, timestamp, notes: 0, commentCount: 0 };

  await userRef.child(key).set(fullPost);
  await postRef.child(key).set(fullPost);
  return { ...fullPost, postId: key };
};

export const postEditUpdate = ({ prop, value }) => {
  return {
    type: POST_EDIT_UPDATE,
    payload: { prop, value }
  };
};

export const postEditSave = ({
  postText, postId, visibleTo, taggedFriends, friendList, user
}) => {
  const db = firebase.database();
  db.ref(`/posts/${postId}`).update({ content: postText, visibleTo, taggedFriends });

  return (dispatch) => {
    db.ref(`/users/${user.uid}/posts/${postId}`)
      .update({ content: postText, visibleTo, taggedFriends })
      .then(() => {
        sendPrayerRequestNotifications({
          user,
          content: postText,
          postId,
          friendList,
          visibleTo,
          taggedFriends,
          isUpdate: true
        });
        dispatch({ type: POST_SAVE_SUCCESS });
      });
  };
};

export const postDelete = ({ postId }) => {
  const date = Date.now();
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/posts/${postId}/deleted`).set(date);

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/posts/${postId}/deleted`)
      .set(date)
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

export const answerPrayer = ({ postId, user, userFeedIndex }) => {
    const db = firebase.database();
    const answeredOn = getCurrentDate();

    db.ref(`/users/${user.uid}/posts/${postId}`)
      .update({ answered: answeredOn });
    db.ref(`/posts/${postId}`)
      .update({ answered: answeredOn });

    return {
      type: UPDATE_USER_FEED,
      index: userFeedIndex,
      field: 'answered',
      value: answeredOn,
    };
};

export const unanswerPrayer = ({ postId, user, userFeedIndex }) => {
    const db = firebase.database();
    db.ref(`/users/${user.uid}/posts/${postId}`)
      .update({ answered: false });
    db.ref(`/posts/${postId}`)
      .update({ answered: false });

    return {
      type: UPDATE_USER_FEED,
      index: userFeedIndex,
      field: 'answered',
      value: false,
    };
};
