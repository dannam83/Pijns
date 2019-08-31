import firebase from 'firebase';

export const markRequestAsSeen = (userId, friendId) => {
  const db = firebase.database();
  db.ref(`/requests/${userId}/${friendId}/seen`).set(true);
};
