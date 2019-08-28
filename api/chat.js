import firebase from 'firebase';

export const onChat = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}_ON`).set(true);
};

export const offChat = (userId, friendId) => {
  const chatKey = formatChatKey(userId, friendId);
  firebase.database().ref(`/chats/${chatKey}/${userId}_ON`).set(false);
};

const formatChatKey = (userId, friendId) => {
  let small; let big;

  if (userId < friendId) {
    [small, big] = [userId, friendId];
  } else {
    [small, big] = [friendId, userId];
  }
  return (small + big);
};
