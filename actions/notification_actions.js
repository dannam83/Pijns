import firebase from 'firebase';

import { FETCH_NOTIFICATIONS, NOTIFICATIONS_COUNT } from './types';

export const fetchNotifications = userId => {
  return (dispatch) => {
    firebase.database().ref(`/notifications/${userId}`).on(
      'value', snapshot => {
        dispatch({ type: FETCH_NOTIFICATIONS, payload: snapshot.val() });
    });
  };
};

export const listenToNotificationsCount = userId => {
  return (dispatch) => {
    firebase.database().ref(`/users/${userId}/notifications`).on(
      'value', snapshot => {
        dispatch({ type: NOTIFICATIONS_COUNT, payload: snapshot.val() });
    });
  };
};
