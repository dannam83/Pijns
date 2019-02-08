import firebase from 'firebase';

import { FRIEND_STATUS } from './types';

export const friendRequest = ({ profileUserId, currentUser }) => {
  return () => {
    processRequest({ profileUserId, currentUser, type: 'request' });
  };
};

export const acceptFriend = ({ profileUserId, currentUser }) => {
  return () => {
    processRequest({ profileUserId, currentUser, type: 'accept' });
  };
};

export const declineFriend = ({ profileUserId, currentUser }) => {
  return () => {
    processRequest({ profileUserId, currentUser, type: 'decline' });
  };
};

export const getFriendStatus = ({ profileUserId, currentUserId }) => {
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

export const setFriendStatus = ({ status }) => {
  return {
    type: FRIEND_STATUS,
    payload: status
  };
};

const processRequest = ({ profileUserId, currentUser, type }) => {
  const db = firebase.database();
  const currentUserId = currentUser.uid;
  const { userStatus, profileStatus } = friendStatusValues(type);

  db.ref(`/friends/${currentUserId}/${profileUserId}`).set(userStatus);
  db.ref(`/friends/${profileUserId}/${currentUserId}`).set(profileStatus);
  updateRequests({ db, type, profileUserId, currentUser });
  incrementRequestsCounter({ db, type, profileUserId, currentUserId });
};

const friendStatusValues = type => {
  switch (type) {
    case 'request':
      return { userStatus: 'Requested', profileStatus: 'See Requests' };
    case 'accept':
      return { userStatus: 'Unfriend', profileStatus: 'Unfriend' };
    case 'decline':
      return { userStatus: null, profileStatus: null };
    default:
      return { userStatus: null, profileStatus: null };
  }
};

const updateRequests = async ({ db, type, profileUserId, currentUser }) => {
  const currentUserId = currentUser.uid;

  if (type === 'request') {
    await db.ref(`/requests/${profileUserId}/${currentUserId}`).set(currentUser);
  }
  if (type === 'accept' || type === 'decline') {
    await db.ref(`/requests/${currentUserId}/${profileUserId}`).remove();
  }
};

const incrementRequestsCounter = ({ db, type, profileUserId, currentUserId }) => {
  if (type === 'request') {
    const ref = db.ref(`/users/${profileUserId}/requests`);
    ref.transaction((currentCount) => (currentCount || 0) + 1);
  }
  if (type === 'accept' || type === 'decline') {
    const ref = db.ref(`/users/${currentUserId}/requests`);
    ref.transaction((currentCount) => (currentCount) - 1);
  }
};
