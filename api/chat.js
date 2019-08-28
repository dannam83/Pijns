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
