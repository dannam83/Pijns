import firebase from 'firebase';

import { FETCH_PINBOARD } from './types';

export const sendPij = ({ postId, author, currentDate, user }) => {
  const db = firebase.database();

  incrementAuthorPostPijnCount(db, author.id, postId);
  incrementPostsPijnCount(db, postId);
  firebaseRecordPijn({ db, currentDate, postId, user });
};

export const fetchPinboard = (currentUid) => {
  return (dispatch) => {
    firebase.database().ref(`/pinboards/${currentUid}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_PINBOARD, payload: snapshot.val() }
        );
      }
    );
  };
};

export const pinPost = ({ postId, userId }) => {
  const db = firebase.database();
  db.ref(`/pinboards/${userId}/${postId}`).set(-Date.now());
};

const incrementAuthorPostPijnCount = (db, authorId, postId) => {
  const authorPostRef = db.ref(`/users/${authorId}/posts/${postId}/notes/count`);

  authorPostRef.transaction((currentCount) => (currentCount || 0) + 1);
};

const incrementPostsPijnCount = (db, postId) => {
  const postsRef = db.ref(`/posts/${postId}/notes/count`);

  postsRef.transaction((currentCount) => (currentCount || 0) + 1);
};

const firebaseRecordPijn = ({ db, currentDate, postId, user }) => {
  const { uid } = user;
  const userPijnsRef = db.ref(`/userPijns/${uid}/${currentDate}/${postId}`);
  const postNotesRef = db.ref(`/postNotes/${postId}/${uid}${Date.now()}`);
  const date = new Date().toString().slice(4, 16);
  const createdOn = `${date.slice(0, 6)}, ${date.slice(7, 11)}`;

  userPijnsRef.set(Date.now());
  postNotesRef.set({ ...user, timestamp: -Date.now(), createdOn });
};
