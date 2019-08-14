import firebase from 'firebase';

export const addPijnNotification = (user, postId, post) => {
  const { author, content } = post;
  const [sender, timestamp, type] = [user, -Date.now(), 'pijnNote'];
  const db = firebase.database();
  const notificationsRef = db.ref(`/notifications/${author.id}`);
  const notificationsCountRef = db.ref(`/notifications/${author.id}/newNotifications/count`);
  const id = notificationsRef.push().getKey();

  if (user.uid !== author.id) {
    notificationsRef.child(id).set({ id, content, postId, timestamp, sender, type });
    notificationsCountRef.transaction((currentCount) => (currentCount || 0) + 1);
  }
};

export const addCommentNotification = (user, postId, postAuthorId, comment) => {
  const [sender, content, timestamp, type] = [user, comment, -Date.now(), 'comment'];
  const db = firebase.database();
  const notificationsRef = db.ref(`/notifications/${postAuthorId}`);
  const notificationsCountRef = db.ref(`/notifications/${postAuthorId}/newNotifications/count`);
  const id = notificationsRef.push().getKey();

  if (user.uid !== postAuthorId) {
    notificationsRef.child(id).set({ id, content, postId, timestamp, sender, type });
    notificationsCountRef.transaction((currentCount) => (currentCount || 0) + 1);
  }
};

export const deleteNotification = (userId, notificationId) => {
  firebase.database().ref(`/notifications/${userId}/${notificationId}`).set(null);
};

export const resetNotificationsCount = (userId) => {
  const db = firebase.database();
  db.ref(`/notifications/${userId}/newNotifications/count`).set(0);
};
