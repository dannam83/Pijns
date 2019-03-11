import firebase from 'firebase';
import {
  POST_CREATE_UPDATE,
  POST_CREATE_SAVE,
  POST_EDIT_UPDATE,
  POSTS_FETCH_SUCCESS,
  POST_SAVE_SUCCESS,
  POST_DELETE,
  POST_SET_ACTIVE
 } from './types';

export const postCreateUpdate = ({ prop, value }) => {
  return {
    type: POST_CREATE_UPDATE,
    payload: { prop, value }
  };
};

export const postCreateSave = ({ postText, postType, author }) => {
  return (dispatch) => {
    saveToFirebase(author, postText, postType)
    .then(() => dispatch({ type: POST_CREATE_SAVE })
    );
  };
};

const saveToFirebase = async (author, content, type) => {
  const db = firebase.database();
  const userRef = db.ref(`/users/${author.id}/posts`);
  const postRef = db.ref('/posts');
  const key = userRef.push().getKey();
  const date = new Date().toString().slice(4, 16);
  const createdOn = `${date.slice(0, 6)}, ${date.slice(7, 11)}`;
  const timestamp = -Date.now();

  await userRef.child(key).set({
    author, content, type, createdOn, timestamp, notes: 0, commentCount: 0
  });
  await postRef.child(key).set({
    author, content, type, createdOn, timestamp, notes: 0, commentCount: 0
  });
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
        dispatch({ type: POSTS_FETCH_SUCCESS, payload: snapshot.val() }
        );
      }
    );
  };
};

export const setActivePost = ({ postId, postAuthor }) => {
  return {
    type: POST_SET_ACTIVE,
    payload: { id: postId, author: postAuthor }
  };
};

export const answerPrayer = ({ postId, user }) => {
    const db = firebase.database();
    const timestamp = -Date.now();
    db.ref(`/users/${user.uid}/posts/${postId}`)
      .update({ answered: timestamp });
    db.ref(`/posts/${postId}`)
      .update({ answered: timestamp });

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
