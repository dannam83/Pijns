import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

import { FETCH_PIJN_LOG } from './types';

export const sendPijn = ({ postId, author, currentDate }) => {
  const db = firebase.database();

  incrementAuthorPostPijnCount(db, author.id, postId);
  incrementPostsPijnCount(db, postId);
  firebaseRecordPijn(db, currentDate, postId);
  // asyncRecordPijn(currentDate, postId);
};

export const fetchPijnLog = () => {
  const { currentUser } = firebase.auth();
  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/pijns/${currentDate}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_PIJN_LOG, payload: snapshot.val() }
        );
      }
    );
  };
};

// export const fetchPijnLog = () => async dispatch => {
  // const userPijnsRef = db.ref(`/users/${uid}/pijns/${currentDate}/${postId}`);

  // let pijnLog = await AsyncStorage.getItem('pijn_log');
  //
  // try {
  //   if (pijnLog) {
  //     await dispatch({
  //       type: FETCH_PIJN_LOG, payload: JSON.parse(pijnLog)
  //     });
  //   }
  // } catch (err) {
  //   console.warn(err);
  // }

// };

const checkPijnDate = () => async () => {
  let pijnDate = await AsyncStorage.getItem('pijn_date');
  console.log('date', pijnDate);
  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );

  if (!pijnDate || pijnDate < currentDate) {
    await AsyncStorage.setItem('pijn_date', currentDate.toString());
    await AsyncStorage.setItem('pijn_log', JSON.stringify({}));
  }
};

const incrementAuthorPostPijnCount = (db, authorId, postId) => {
  const authorPostRef = db.ref(`/users/${authorId}/posts/${postId}/notes/count`);

  authorPostRef.transaction((currentCount) => (currentCount || 0) + 1);
};

const incrementPostsPijnCount = (db, postId) => {
  const postsRef = db.ref(`/posts/${postId}/notes/count`);

  postsRef.transaction((currentCount) => (currentCount || 0) + 1);
};

const firebaseRecordPijn = (db, currentDate, postId) => {
  const { uid } = firebase.auth().currentUser;
  const userPijnsRef = db.ref(`/users/${uid}/pijns/${currentDate}/${postId}`);

  userPijnsRef.set(Date.now());
};

// const asyncRecordPijn = async (currentDate, postId) => {
//   let pijnLog = await AsyncStorage.getItem('pijn_log');
//   let pijnDate = await AsyncStorage.getItem('pijn_date');
//   const newPijn = JSON.stringify({ [postId]: true });
//
//   if (!pijnDate || pijnDate < currentDate) {
//     console.log('here i am');
//     await AsyncStorage.setItem('pijn_date', currentDate.toString());
//     await AsyncStorage.setItem('pijn_log', newPijn);
//     return;
//   }
//
//   let log = JSON.parse(pijnLog);
//   console.log('pijnLog before merge', log);
//   log[postId] = true;
//
//   await AsyncStorage.setItem('pijn_log', JSON.stringify(log));
//   let newLog = await AsyncStorage.getItem('pijn_log');
//   console.log('after merge and save', newLog);
// };
