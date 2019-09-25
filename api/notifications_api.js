import firebase from 'firebase';
import { sendPushNotification } from './pushNotifications_api';

export const sendPijnNotification = (user, postId, post) => {
  const { author, content } = post;
  const [sender, timestamp, type] = [user, -Date.now(), 'pijnNote'];

  if (user.uid !== author.id) {
    const notification = { content, postId, timestamp, sender, type };
    sendNotification(author.id, notification);
    incrementCounter(author.id);
    sendPushNotification(author.id, `${user.name} sent you a pijn note!`);
  }
};

export const sendCommentNotification = (user, postId, friendId, comment) => {
  const [sender, content, timestamp, type] = [user, comment, -Date.now(), 'comment'];

  if (user.uid !== friendId) {
    const notification = { content, postId, timestamp, sender, type };
    sendNotification(friendId, notification);
    incrementCounter(friendId);
    sendPushNotification(friendId, `${user.name} commented on your post: ${content}`);
  }
};

export const sendCommentLikeNotification = (
  user, postId, commentAuthorId, commentId, comment
) => {
  const [sender, content, timestamp, type] = [user, comment, -Date.now(), 'commentLike'];

  if (user.uid !== commentAuthorId) {
    const notification = { content, postId, timestamp, sender, type, commentId };
    sendNotification(commentAuthorId, notification);
    incrementCounter(commentAuthorId);
    sendPushNotification(commentAuthorId, `${user.name} liked your comment: ${content}`);
  }
};

export const sendPrayerAnsweredNotifications = (user, postId, post) => {
  const { content } = post;
  const [sender, timestamp, type] = [user, -Date.now(), 'prayerAnswered'];
  const notification = { content, postId, timestamp, sender, type };

  firebase.database().ref(`/postNotes/${postId}`)
    .on('value', snapshot => {
      const postNotes = snapshot.val();
      if (!postNotes) { return; }

      const keys = Object.keys(postNotes);
      const sent = {};
      keys.forEach(key => {
        const { uid } = postNotes[key];
        if (!sent[uid] && uid !== user.uid) {
          sendNotification(uid, notification);
          incrementCounter(uid);
          sendPushNotification(uid, `${user.name} has an answered prayer that you prayed for!`);
          sent[uid] = true;
        }
      });
    }
  );
};

export const sendPrayerRequestNotifications = ({
  user, postId, content, friendList, visibleTo, taggedFriends
}) => {
  if (!friendList || visibleTo === 'Only Me') { return; }

  const [sender, timestamp, type] = [user, -Date.now(), 'prayerRequest'];
  const notification = { content, postId, timestamp, sender, type };

  const sendTo = visibleTo === 'Tagged Friends' ? taggedFriends : friendList;

  const userIds = Object.keys(sendTo);
  userIds.forEach(userId => {
    sendNotification(userId, notification);
    incrementCounter(userId);
    sendPushNotification(userId, `${user.name} shared a new prayer request`);
  });
};

export const markAsSeen = (userId, notificationId) => {
  const db = firebase.database();
  db.ref(`/notifications/${userId}/${notificationId}/seen`).set(true);
};

export const deleteNotification = (userId, notificationId) => {
  firebase.database().ref(`/notifications/${userId}/${notificationId}`).set(null);
};

const sendNotification = (friendId, notification) => {
  const db = firebase.database();
  const notificationsRef = db.ref(`/notifications/${friendId}`);
  const key = notificationsRef.push().getKey();

  notificationsRef.child(key).set({ ...notification, id: key });
};

export const incrementCounter = (friendId) => {
  const db = firebase.database();
  const countRef = db.ref(`/users/${friendId}/notifications`);

  countRef.transaction((currentCount) => (currentCount || 0) + 1);
};

export const resetNotificationsCount = (userId) => {
  const db = firebase.database();
  db.ref(`/users/${userId}/notifications`).set(0);
};
