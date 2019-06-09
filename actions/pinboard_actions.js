import firebase from 'firebase';

import { FETCH_PINBOARD } from './types';

export const fetchPinboard = (currentUid) => {
  return (dispatch) => {
    firebase.database().ref(`/pinboards/${currentUid}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_PINBOARD, payload: snapshot.val() }
        );
      }
    );
  };
};

export const pinPost = ({ postId, userId }) => {
  const db = firebase.database();
  db.ref(`/pinboards/${userId}/${postId}`).set(-Date.now());
};

export const unpinPost = ({ postId, userId }) => {
  const db = firebase.database();
  db.ref(`/pinboards/${userId}/${postId}`).remove();
};
