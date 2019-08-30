import firebase from 'firebase';

export const sendPijnNotification = (user, postId, post) => {
  const { author, content } = post;
  const [sender, timestamp, type] = [user, -Date.now(), 'pijnNote'];

  if (user.uid !== author.id) {
    const notification = { content, postId, timestamp, sender, type };
    addNotification(author.id, notification);
    incrementCounter(author.id);
  }
};

export const sendCommentNotification = (user, postId, postAuthorId, comment) => {
  const [sender, content, timestamp, type] = [user, comment, -Date.now(), 'comment'];

  if (user.uid !== postAuthorId) {
    const notification = { content, postId, timestamp, sender, type };
    addNotification(postAuthorId, notification);
    incrementCounter(postAuthorId);
  }
};

export const deleteNotification = (userId, notificationId) => {
  firebase.database().ref(`/notifications/${userId}/${notificationId}`).set(null);
};

const addNotification = (postAuthorId, notification) => {
  const db = firebase.database();
  const notificationsRef = db.ref(`/notifications/${postAuthorId}`);
  const key = notificationsRef.push().getKey();

  notificationsRef.child(key).set({ ...notification, id: key });
};

const incrementCounter = (postAuthorId) => {
  const db = firebase.database();
  const countRef = db.ref(`/notifications/${postAuthorId}/newNotifications/count`);

  countRef.transaction((currentCount) => (currentCount || 0) + 1);
};
