import firebase from 'firebase';
import _ from 'lodash';

import { sendPushNotification } from './push_notifications_api';

export const sendPijnNotification = (user, postId, post, taggedFriends) => {
  const { author, content } = post;
  const [sender, timestamp, type] = [user, -Date.now(), 'pijnNote'];

  const notification = { content, postId, timestamp, sender, type };
  if (user.uid !== author.id) {
    sendNotification(author.id, notification);
    incrementCounter(author.id);
    sendPushNotification(author.id, `${user.name} sent you a pijn note!`);
  }

  notification.type = 'pijnNoteTaggedFriend';
  if (taggedFriends) {
    _.each(taggedFriends, friend => {
      if (friend.uid !== user.uid) {
        const message = "sent a pijn note for a prayer request you're tagged in!";
        sendNotification(friend.uid, notification);
        sendPushNotification(friend.uid, `${user.name} ${message}`);
      }
    });
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

export const sendPostLikeNotification = (
  user, postId, postAuthorId, postText, taggedFriends
) => {
  const [sender, content, timestamp, type] = [user, postText, -Date.now(), 'postLike'];
  const notification = { content, postId, timestamp, sender, type };

  if (user.uid !== postAuthorId) {
    sendNotification(postAuthorId, notification);
    incrementCounter(postAuthorId);
    sendPushNotification(postAuthorId, `${user.name} liked your post: ${content}`);
  }

  notification.type = 'postLikeTaggedFriend';
  if (taggedFriends) {
    _.each(taggedFriends, friend => {
      if (friend.uid !== user.uid) {
        const message = "liked a post you're tagged in:";
        sendNotification(friend.uid, notification);
        sendPushNotification(friend.uid, `${user.name} ${message} ${content}`);
      }
    });
  }
};

export const sendPrayerAnsweredNotifications = (user, postId, post) => {
  const { content, visibleTo, taggedFriends } = post;
  if (visibleTo === 'Only Me') { return; }

  const [sender, timestamp, type] = [user, -Date.now(), 'prayerAnswered'];
  const notification = { content, postId, timestamp, sender, type };

  firebase.database().ref(`/postNotes/${postId}`)
    .on('value', snapshot => {
      const postNotes = snapshot.val();

      if (!postNotes && visibleTo !== 'Tagged Friends') { return; }

      const sendTo = visibleTo === 'Tagged Friends'
        ? taggedFriends : postNotes;

      const keys = Object.keys(sendTo);

      const message = visibleTo === 'Tagged Friends'
        ? "has an answered prayer request that you're tagged in!"
        : 'has an answered prayer that you prayed for!';

      const sent = {};

      keys.forEach(key => {
        const { uid } = sendTo[key];
        if (!sent[uid] && uid !== user.uid) {
          sendNotification(uid, notification);
          incrementCounter(uid);
          sendPushNotification(uid, `${user.name} ${message}`);
          sent[uid] = true;
        }
      });
    }
  );
};

export const sendPrayerRequestNotifications = ({
  user, postId, content, friendList, visibleTo, taggedFriends, isUpdate
}) => {
  if (!friendList || visibleTo === 'Only Me') { return; }

  const [sender, timestamp, type] = [user, -Date.now(), 'prayerRequest'];
  const notification = { content, postId, timestamp, sender, type };

  const sendTo = visibleTo === 'Tagged Friends' ? taggedFriends : friendList;

  let message;
  if (visibleTo === 'Tagged Friends') {
    if (!isUpdate) { message = 'tagged you in a new prayer request!'; }
    if (isUpdate) { message = "updated a prayer request that you're tagged in!"; }
  } else {
    if (!isUpdate) { message = 'shared a new prayer request.'; }
    if (isUpdate) { message = 'updated a prayer request.'; }
  }

  const userIds = Object.keys(sendTo);
  userIds.forEach(userId => {
    sendNotification(userId, notification);
    incrementCounter(userId);
    sendPushNotification(userId, `${user.name} ${message}`);
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
