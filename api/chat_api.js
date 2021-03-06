import firebase from 'firebase';
import { formatChatKey, getCurrentTime, getTimestampDate } from '../functions/common';
import { sendPushNotification } from './push_notifications_api';

export const onChat = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}_ON`).set(true);
};

export const offChat = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}_ON`).set(false);
};

export const chatMessageSave = (user, friendId, message) => {
  const date = -getTimestampDate();
  const time = getCurrentTime();
  const chatKey = formatChatKey(user.uid, friendId);
  const db = firebase.database();

  db.ref(`/chats/${chatKey}/messages/${date}`).push({
    message, userId: user.uid, userPic: user.picture, time
  });
};

export const chatTypingStart = (userId, friendId, text) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}`).set(text);
};

export const chatTypingEnd = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}`).set('');
};

export const chatInitialize = async (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);

  await firebase.database().ref(`/chats/${chatKey}/${userId}`).set('');
  await firebase.database().ref(`/chats/${chatKey}/${friendId}`).set('');
  await firebase.database().ref(`/chats/${chatKey}/messages`).set(0);
};

export const chatDetachListener = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}`).off();
};

export const sendMessageNotification = (user, friendId, content) => {
  sendPushNotification(friendId, `${user.name}: ${content}`);
};

export const incrementMessageCounter = (userId) => {
  const messagesRef = firebase.database().ref(`/users/${userId}/messages`);

  messagesRef.transaction(currentCount => (currentCount || 0) + 1);
};
