import firebase from 'firebase';

import { FETCH_CHAT_LIST, CHAT_LIST_CLEAR, MESSAGES_COUNT } from './types';
import { chatListInitialize, chatListDetachListener } from '../api/chat_list_api';

export const fetchChatList = (userId) => {
  return (dispatch) => {
    firebase.database().ref(`/chatLists/${userId}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          dispatch({ type: FETCH_CHAT_LIST, payload: snapshot.val() });
        } else {
          chatListInitialize(userId);
          firebase.database().ref(`/chatLists/${userId}`).on('value', snapshot => {
            dispatch({ type: FETCH_CHAT_LIST, payload: snapshot.val() });
          });
        }
      }
    );
  };
};

export const chatListUnmount = (userId) => {
  chatListDetachListener(userId);
  return ({ type: CHAT_LIST_CLEAR });
};

export const listenToMessagesCount = userId => {
  return (dispatch) => {
    firebase.database().ref(`/users/${userId}/messages`).on(
      'value', snapshot => {
        dispatch({ type: MESSAGES_COUNT, payload: snapshot.val() });
    });
  };
};
