import firebase from 'firebase';

import { FETCH_CHAT, CHAT_CLEAR } from './types';
import { formatChatKey } from '../functions/common';
import { chatInitialize, chatDetachListener } from '../api/chat_api';

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

export const chatUnmount = (userId, friendId) => {
  chatDetachListener(userId, friendId);
  return ({ type: CHAT_CLEAR });
};
