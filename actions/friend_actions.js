import firebase from 'firebase';

import { incrementCounter } from '../api/notifications_api';
import { sendPushNotification } from '../api/push_notifications_api';

import { FRIEND_STATUS, FRIEND_POSTS_FETCH_SUCCESS, FRIEND_CLEAR } from './types';

export const friendRequest = ({ profileUserId, currentUser }) => {
  const { name } = currentUser;
  return () => {
    processRequest({ profileUserId, currentUser, type: 'request' });
    incrementCounter(profileUserId);
    sendPushNotification(profileUserId, `${name} sent you a friend request`);
  };
};

export const acceptFriend = ({ profileUserId, currentUser, friend }) => {
  return () => {
    processRequest({ profileUserId, currentUser, type: 'accept', friend });
    sendPushNotification(profileUserId, `${currentUser.name} accepted your friend request!`);
  };
};

export const declineFriend = ({ profileUserId, currentUser, friend }) => {
  return () => {
    processRequest({ profileUserId, currentUser, type: 'decline', friend });
  };
};

export const unfriend = ({ profileUserId, currentUser }) => {
  return () => {
    processRequest({ profileUserId, currentUser, type: 'unfriend' });
  };
};

export const getFriendStatus = ({ profileUserId, currentUserId }) => {
  return (dispatch) => {
    const db = firebase.database();
    db.ref(`/friends/${currentUserId}/${profileUserId}/status`)
    .on('value', snapshot => {
      dispatch({
        type: FRIEND_STATUS,
        payload: snapshot.val(),
        friendId: profileUserId,
      });
    });
  };
};

export const friendStatusSilence = ({ profileUserId, currentUserId }) => {
  const db = firebase.database();
  db.ref(`/friends/${currentUserId}/${profileUserId}/status`).off();
  return ({
    type: FRIEND_STATUS,
    payload: 'pending',
  });
};

export const friendPostsFetch = (userId) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${userId}/posts`)
      .on('value', snapshot => {
        dispatch({
          type: FRIEND_POSTS_FETCH_SUCCESS,
          payload: snapshot.val(),
          friendId: userId,
        });
      }
    );
  };
};

export const clearFriend = () => {
  return {
    type: FRIEND_CLEAR
  };
};

export const setFriendStatus = ({ status }) => {
  return {
    type: FRIEND_STATUS,
    payload: status
  };
};

const processRequest = async ({ profileUserId, currentUser, type, friend }) => {
  const db = firebase.database();
  const currentUserId = currentUser.uid;

  updateRequests({ db, type, profileUserId, currentUser });
  incrementRequestsCounter({ db, type, profileUserId, currentUserId });
  try {
    await updateFriends({ db, type, profileUserId, currentUser });
    if (!friend === false) {
      const { status } = friend;
      setFriendStatus({ status });
    }
  } catch (err) {
    console.warn(err);
  }
};

const friendStatusValues = type => {
  switch (type) {
    case 'request':
      return { userStatus: 'Requested', profileStatus: 'See Requests' };
    case 'accept':
      return { userStatus: 'Unfriend', profileStatus: 'Unfriend' };
    default:
      return { userStatus: 'Add Friend', profileStatus: 'Add Friend' };
  }
};

const updateFriends = ({ db, type, profileUserId, currentUser }) => {
  if (type === 'decline' || type === 'unfriend') {
    removeFriends({ db, profileUserId, currentUser });
  }

  if (type === 'request' || type === 'accept') {
    saveFriends({ db, type, profileUserId, currentUser });
  }
};

const saveFriends = ({ db, type, profileUserId, currentUser }) => {
  const { userStatus, profileStatus } = friendStatusValues(type);
  const currentUserId = currentUser.uid;

  db.ref(`/userSearch/${profileUserId}`).once('value', snapshot => {
    const { name, picture } = snapshot.val();
    const profileUser = { name, picture, uid: profileUserId };
    db.ref(`/friends/${currentUserId}/${profileUserId}/user`).set(profileUser);
  });

  db.ref(`/friends/${profileUserId}/${currentUserId}/user`).set(currentUser);
  db.ref(`/friends/${currentUserId}/${profileUserId}/status`).set(userStatus);
  db.ref(`/friends/${profileUserId}/${currentUserId}/status`).set(profileStatus);
};

const removeFriends = ({ db, profileUserId, currentUser }) => {
  const currentUserId = currentUser.uid;

  db.ref(`/friends/${currentUserId}/${profileUserId}`).set(null);
  db.ref(`/friends/${profileUserId}/${currentUserId}`).set(null);
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
