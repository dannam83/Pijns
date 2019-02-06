import firebase from 'firebase';

import { FETCH_REQUESTS } from './types';

export const fetchRequests = (currentUserId) => {
  return (dispatch) => {
    firebase.database().ref(`/requests/${currentUserId}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_REQUESTS, payload: snapshot.val() });
      }
    );
  };
};
