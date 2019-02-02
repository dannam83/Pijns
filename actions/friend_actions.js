import firebase from 'firebase';

import { FRIEND_STATUS } from './types';

export const friendRequest = ({ profileUserId, currentUserId }) => {
  return (dispatch) => {
    processRequest({ profileUserId, currentUserId });
    dispatch({
      type: FRIEND_STATUS,
      payload: 'requestSent'
    });
  };
};

export const friendStatus = ({ profileUserId, currentUserId }) => {
  return (dispatch) => {
    const db = firebase.database();
    db.ref(`/friends/${currentUserId}/${profileUserId}`)
      .once('value', snapshot => {
        dispatch({
          type: FRIEND_STATUS,
          payload: snapshot.val()
        });
      }
    );
  };
};

const processRequest = async ({ profileUserId, currentUserId }) => {
  const db = firebase.database();

  await db.ref(`/friends/${currentUserId}/${profileUserId}`).set('requestSent');
  await db.ref(`/friends/${profileUserId}/${currentUserId}`).set('requestReceived');
};

// export const sendPijn = ({ postId, author, currentDate }) => {
//   const db = firebase.database();
//
//   incrementAuthorPostPijnCount(db, author.id, postId);
//   incrementPostsPijnCount(db, postId);
//   firebaseRecordPijn(db, currentDate, postId);
// };

// export const fetchPijnLog = () => {
//   const { currentUser } = firebase.auth();
//   const currentDate = new Date(
//     new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
//   );
//
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/pijns/${currentDate}`)
//       .on('value', snapshot => {
//         dispatch({ type: FETCH_PIJN_LOG, payload: snapshot.val() }
//         );
//       }
//     );
//   };
// };

// const incrementAuthorPostPijnCount = (db, authorId, postId) => {
//   const authorPostRef = db.ref(`/users/${authorId}/posts/${postId}/notes/count`);
//
//   authorPostRef.transaction((currentCount) => (currentCount || 0) + 1);
// };
//
// const incrementPostsPijnCount = (db, postId) => {
//   const postsRef = db.ref(`/posts/${postId}/notes/count`);
//
//   postsRef.transaction((currentCount) => (currentCount || 0) + 1);
// };
//
// const firebaseRecordPijn = (db, currentDate, postId) => {
//   const { uid } = firebase.auth().currentUser;
//   const userPijnsRef = db.ref(`/users/${uid}/pijns/${currentDate}/${postId}`);
//
//   userPijnsRef.set(Date.now());
// };
