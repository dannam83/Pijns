import firebase from 'firebase';

import { FETCH_CHAT, CHAT_CLEAR } from './types';
import { getCurrentTime, getTimestampDate } from '../functions/common';

export const fetchChat = ({ userId, friendId }) => {
  const chatKey = formatChatKey(userId, friendId);
  return (dispatch) => {
    firebase.database().ref(`/chats/${chatKey}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          dispatch({ type: FETCH_CHAT, payload: snapshot.val() });
        } else {
          chatInitialize(userId, friendId);
          firebase.database().ref(`/chats/${chatKey}`).on('value', snapshot => {
            dispatch({ type: FETCH_CHAT, payload: snapshot.val() });
          });
        }
      }
    );
  };
};

export const chatMessageSave = (user, friendId, message) => {
  const date = -getTimestampDate();
  const time = getCurrentTime();
  const chatKey = formatChatKey(user.uid, friendId);
  const db = firebase.database();

  db.ref(`/chats/${chatKey}/messages/${date}`).push({
    message, userId: user.uid, userPic: user.picture, time
  });

  return ({
    type: 'DUMMY'
  });
};

export const chatTypingStart = (userId, friendId, text) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}`).set(text);

  return ({
    type: 'DUMMY'
  });
};

export const chatTypingEnd = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}`).set('');
  return ({
    type: 'DUMMY'
  });
};

export const chatClear = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}`).off();
  return ({ type: CHAT_CLEAR });
};

export const chatDeleteAll = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}`).set(null);
  return ({
    type: 'DUMMY'
  });
};

export const chatInitialize = async (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);

  await firebase.database().ref(`/chats/${chatKey}/${userId}`).set('');
  await firebase.database().ref(`/chats/${chatKey}/${friendId}`).set('');
  await firebase.database().ref(`/chats/${chatKey}/messages`).set(0);

  return ({
    type: 'DUMMY'
  });
};

export const chatDetachListener = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}`).off();

  return ({
    type: 'DUMMY'
  });
};

const formatChatKey = (userId, friendId) => {
  let small;
  let big;
  if (userId < friendId) {
    small = userId;
    big = friendId;
  } else {
    small = friendId;
    big = userId;
  }
  return (small + big);
};
