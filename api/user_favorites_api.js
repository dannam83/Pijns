import firebase from 'firebase';

export const favoritePost = ({ user, postId }) => {
  console.log('faving')
  const db = firebase.database();
  db.ref(`/userFavorites/${user.uid}/${postId}`).set(-Date.now());
};

export const unfavoritePost = ({ user, postId }) => {
  console.log('unning')
  const db = firebase.database();
  db.ref(`/userFavorites/${user.uid}/${postId}`).set(null);
};
