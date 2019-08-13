import firebase from 'firebase';

export const addPijnNotification = (userId, postId, post) => {
  const { author, content } = post;
  const timestamp = -Date.now();
  const db = firebase.database();
  const postRef = db.ref(`/notifications/${author.id}/${postId}`);
  const newPijnsRef = db.ref(`/notifications/${author.id}/${postId}/newPijns`);

  if (userId !== author.id) {
    newPijnsRef.transaction((currentCount) => (currentCount || 0) + 1);
    postRef.update({ content, postId, timestamp });
  }
};

export const zeroPijnNotification = (userId, postId) => {
  const db = firebase.database();

  db.ref(`/notifications/${userId}/${postId}/newPijns`).set(0);
};
