import firebase from 'firebase';

import { FETCH_POST_NOTES, NOTES_CLEAR } from './types';

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

export const notesClear = () => {
  return ({ type: NOTES_CLEAR });
};
