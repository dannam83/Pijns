import firebase from 'firebase';

import { FETCH_NOTIFICATIONS } from './types';

export const fetchNotifications = userId => {
  return (dispatch) => {
    firebase.database().ref(`/notifications/${userId}`).on(
      'value', snapshot => {
        dispatch({ type: FETCH_NOTIFICATIONS, payload: snapshot.val() });
    });
  };
};
