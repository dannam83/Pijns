import firebase from 'firebase';

import { FETCH_CHAT, CHAT_CLEAR } from './types';

export const fetchChat = ({ userId, friendId }) => {
  const chatKey = formatChatKey(userId, friendId);

  return (dispatch) => {
    firebase.database().ref(`/chats/${chatKey}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_CHAT, payload: snapshot.val() }
        );
      }
    );
  };
};

export const chatTypingStart = (userId, otherId) => {
  const chatKey = formatChatKey(userId, otherId);
  firebase.database().ref(`/chats/${chatKey}/${userId}`).set(true);
  return ({
    type: 'DUMMY'
  });
};

export const chatTypingEnd = (userId, otherId) => {
  const chatKey = formatChatKey(userId, otherId);
  firebase.database().ref(`/chats/${chatKey}/${userId}`).set(false);
  return ({
    type: 'DUMMY'
  });
};

export const chatClear = (userId, otherId) => {
  const chatKey = formatChatKey(userId, otherId);
  firebase.database().ref(`/chats/${chatKey}/${userId}`).off();
  return ({ type: CHAT_CLEAR });
};

const formatChatKey = (userId, otherId) => {
  let small;
  let big;
  if (userId < otherId) {
    small = userId;
    big = otherId;
  } else {
    small = otherId;
    big = userId;
  }
  return (small + big);
};
