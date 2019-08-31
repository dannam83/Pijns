import firebase from 'firebase';

import { formatChatKey } from '../functions/common';

export const chatListInitialize = async (userId) => {
  await firebase.database().ref(`/chatLists/${userId}`).set(0);
};

export const setChatListFriendData = (user, friendId, friendName, friendPic) => {
  const { uid, name, picture } = user;
  const chatKey = formatChatKey(uid, friendId);
  const db = firebase.database();

  db.ref(`/chatLists/${uid}/${chatKey}/friendName`).set(friendName);
  db.ref(`/chatLists/${uid}/${chatKey}/friendPic`).set(friendPic);
  db.ref(`/chatLists/${friendId}/${chatKey}/friendName`).set(name);
  db.ref(`/chatLists/${friendId}/${chatKey}/friendPic`).set(picture);
};

export const updateChatMessage = (userId, friendId, message) => {
  const chatKey = formatChatKey(userId, friendId);
  const timestamp = -Date.now();
  const db = firebase.database();

  db.ref(`/chatLists/${userId}/${chatKey}/lastMessage`).set(message);
  db.ref(`/chatLists/${userId}/${chatKey}/lastMessageBy`).set(userId);
  db.ref(`/chatLists/${userId}/${chatKey}/lastMessageTimestamp`).set(timestamp);
  db.ref(`/chatLists/${friendId}/${chatKey}/lastMessage`).set(message);
  db.ref(`/chatLists/${friendId}/${chatKey}/lastMessageBy`).set(userId);
  db.ref(`/chatLists/${friendId}/${chatKey}/lastMessageTimestamp`).set(timestamp);
};

export const incrementUnread = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  console.log(chatKey);
  const db = firebase.database();
  const ref = `/chatLists/${friendId}/${chatKey}/unread`;

  db.ref(ref).transaction((currentCount) => (currentCount || 0) + 1);
};

export const resetUnread = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  const db = firebase.database();

  db.ref(`/chatLists/${userId}/${chatKey}/unread`).set(0);
};
