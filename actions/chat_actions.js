import firebase from 'firebase';

import { FETCH_CHAT, CHAT_CLEAR } from './types';

export const fetchChat = ({ userId, friendId }) => {
  let small;
  let big;
  if (userId < friendId) {
    small = userId;
    big = friendId;
  } else {
    small = friendId;
    big = userId;
  }

  return (dispatch) => {
    firebase.database().ref(`/chats/${small + big}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_CHAT, payload: snapshot.val() }
        );
      }
    );
  };
};

export const chatTypingStart = () => {
  console.log('started');
  return ({
    type: 'DUMMY'
  });
};

export const chatTypingEnd = () => {
  console.log('ended');
  return ({
    type: 'DUMMY'
  });
};

export const chatClear = () => {
  return ({ type: CHAT_CLEAR });
};
