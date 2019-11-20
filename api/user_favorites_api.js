import firebase from 'firebase';

export const favoritePost = ({ user, postId }) => {
  const db = firebase.database();
  db.ref(`/userFavorites/${user.uid}/${postId}`).set(-Date.now());
};

export const unfavoritePost = ({ user, postId }) => {
  const db = firebase.database();
  db.ref(`/userFavorites/${user.uid}/${postId}`).set(null);
};
