import firebase from 'firebase';
import {
  FETCH_FRIEND_LIST
 } from './types';

export const fetchFriendList = (userId) => {
  return (dispatch) => {
    firebase.database().ref(`/friends/${userId}`)
      .orderByChild('status')
      .equalTo('Unfriend')
      .once('value', snapshot => {
        dispatch({ type: FETCH_FRIEND_LIST, payload: snapshot.val() }
        );
      }
    );
  };
};
