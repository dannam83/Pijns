import firebase from 'firebase';

import { FRIEND_STATUS } from './types';

export const friendRequest = ({ profileUserId, currentUser }) => {
  return () => {
    processRequest({ profileUserId, currentUser });
  };
};

export const friendStatus = ({ profileUserId, currentUserId }) => {
  return (dispatch) => {
    const db = firebase.database();
    db.ref(`/friends/${currentUserId}/${profileUserId}`)
    .on('value', snapshot => {
      dispatch({
        type: FRIEND_STATUS,
        payload: snapshot.val()
      });
    });
  };
};

const processRequest = async ({ profileUserId, currentUser }) => {
  const db = firebase.database();
  const currentUserId = currentUser.uid;

  await db.ref(`/friends/${currentUserId}/${profileUserId}`).set('Requested');
  await db.ref(`/friends/${profileUserId}/${currentUserId}`).set('See Requests');
  await db.ref(`/requests/${profileUserId}/${currentUserId}`).set(currentUser);

  const profileUserRef = db.ref(`/users/${profileUserId}/requests`);
  profileUserRef.transaction((currentCount) => (currentCount || 0) + 1);
};
