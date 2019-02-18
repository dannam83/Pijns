import firebase from 'firebase';

import { FETCH_POST_NOTES } from './types';

export const fetchPostNotes = ({ postId }) => {
  return (dispatch) => {
    firebase.database().ref(`/postNotes/${postId}`)
      .orderByChild('timestamp')
      .on('value', snapshot => {
        console.log('snap', snapshot.val());
        dispatch({ type: FETCH_POST_NOTES, payload: snapshot.val() }
        );
      }
    );
  };
};
