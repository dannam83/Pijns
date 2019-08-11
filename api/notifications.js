import firebase from 'firebase';

import { getTimestampDate } from '../functions/common';

export const addPijnNotification = (userId, postId, post) => {
  const { author, content } = post;
  const db = firebase.database();
  const postRef = db.ref(`/notifications/${author.id}/${postId}`);
  const newPijnsRef = db.ref(`/notifications/${author.id}/${postId}/newPijns`);

  newPijnsRef.transaction((currentCount) => (currentCount || 0) + 1);
  postRef.update({ content, postId });
};

export const zeroPijnNotification = (userId, postId) => {
  const date = getTimestampDate();
  const db = firebase.database();

  db.ref(`/notifications/${userId}/${date}/${postId}`).set(0);
};
