import firebase from 'firebase';

import { FETCH_CHAT_LIST } from './types';
import { chatListInitialize } from '../api/chat_list_api';

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
