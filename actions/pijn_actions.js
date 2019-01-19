import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

export const sendPijn = ({ postId, author, currentDate }) => {
  const db = firebase.database();

  incrementAuthorPostPijnCount(db, author.id, postId);
  incrementPostsPijnCount(db, postId);
  firebaseRecordPijn(db, currentDate, postId);
  asyncRecordPijn(currentDate, postId);
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

const asyncRecordPijn = async (currentDate, postId) => {
  let pijnDate = await AsyncStorage.getItem('pijn_date');

  if (pijnDate === currentDate.toString()) {
    console.log('hi');
    let logs = await AsyncStorage.getItem('pijn_log');
    console.log(logs);
    console.log('id', postId);
  }

  if (!pijnDate || pijnDate < currentDate) {
    await AsyncStorage.setItem('pijn_date', currentDate.toString());
    await AsyncStorage.setItem('pijn_log', JSON.stringify({}));
  }

  await AsyncStorage.mergeItem('pijn_log', JSON.stringify({ [postId]: true }));
};
