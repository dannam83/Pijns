import firebase from 'firebase';

export const sendPijn = ({ postId, author, currentDate }) => {
  const db = firebase.database();

  incrementAuthorPostPijnCount(db, author.id, postId);
  incrementPostsPijnCount(db, postId);
  savePijnSentRecord(db, currentDate, postId);
};

const incrementAuthorPostPijnCount = (db, authorId, postId) => {
  const authorPostRef = db.ref(`/users/${authorId}/posts/${postId}/notes/count`);

  authorPostRef.transaction((currentCount) => (currentCount || 0) + 1);
};

const incrementPostsPijnCount = (db, postId) => {
  const postsRef = db.ref(`/posts/${postId}/notes/count`);

  postsRef.transaction((currentCount) => (currentCount || 0) + 1);
};

const savePijnSentRecord = (db, currentDate, postId) => {
  const { uid } = firebase.auth().currentUser;
  const userPijnsRef = db.ref(`/users/${uid}/pijns/${currentDate}/${postId}`);

  userPijnsRef.set(Date.now());
};
