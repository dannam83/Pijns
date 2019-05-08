import firebase from 'firebase';

import { FRIEND_STATUS, FRIEND_POSTS_FETCH_SUCCESS, FRIEND_CLEAR } from './types';

export const friendRequest = ({ profileUserId, currentUser }) => {
  return () => {
    processRequest({ profileUserId, currentUser, type: 'request' });
  };
};

export const acceptFriend = ({ profileUserId, currentUser, friend }) => {
  return () => {
    processRequest({ profileUserId, currentUser, type: 'accept', friend });
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
        payload: snapshot.val()
      });
    });
  };
};

export const friendPostsFetch = (userId) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${userId}/posts`)
      .on('value', snapshot => {
        dispatch({ type: FRIEND_POSTS_FETCH_SUCCESS, payload: snapshot.val() }
        );
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
      return { userStatus: null, profileStatus: null };
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
