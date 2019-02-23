import firebase from 'firebase';

import { FETCH_PIJN_LOG } from './types';

export const sendPijn = ({ postId, author, currentDate, user }) => {
  const db = firebase.database();

  incrementAuthorPostPijnCount(db, author.id, postId);
  incrementPostsPijnCount(db, postId);
  firebaseRecordPijn({ db, currentDate, postId, user });
};

export const fetchPijnLog = () => {
  const { currentUser } = firebase.auth();
  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );

  return (dispatch) => {
    firebase.database().ref(`/userPijns/${currentUser.uid}/${currentDate}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_PIJN_LOG, payload: snapshot.val() }
        );
      }
    );
  };
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
