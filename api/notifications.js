import firebase from 'firebase';

export const addPijnNotification = (user, postId, post) => {
  const { author, content } = post;
  const timestamp = -Date.now();
  const db = firebase.database();
  const notificationsRef = db.ref(`/notifications/${author.id}`);
  const notificationsCountRef = db.ref(`/notifications/${author.id}/newNotifications/count`);
  const id = notificationsRef.push().getKey();

  if (user.uid !== author.id) {
    notificationsRef.child(id).set({ id, content, postId, timestamp, sender: user });
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
