import firebase from 'firebase';

import { formatChatKey } from '../functions/common';

export const chatListInitialize = async (userId) => {
  await firebase.database().ref(`/chatLists/${userId}`).set(0);
};

export const setChatlistFriendData = (userId, friendId, name, pic) => {
  const chatKey = formatChatKey(userId, friendId);
  const db = firebase.database();

  db.ref(`/chatLists/${userId}/${chatKey}/friend`).set({ name, pic });
};

export const updateChatListMessage = (userId, friendId, message) => {
  const chatKey = formatChatKey(userId, friendId);
  const timestamp = -Date.now();
  const db = firebase.database();

  db.ref(`/chatLists/${userId}/${chatKey}/lastMessage`).set(message);
  db.ref(`/chatLists/${userId}/${chatKey}/lastMessageBy`).set(userId);
  db.ref(`/chatLists/${userId}/${chatKey}/lastMessageTimestamp`).set(timestamp);
};
