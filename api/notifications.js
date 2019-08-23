import firebase from 'firebase';

export const addPijnNotification = (user, postId, post) => {
  const { author, content } = post;
  const [sender, timestamp, type] = [user, -Date.now(), 'pijnNote'];

  if (user.uid !== author.id) {
    const notification = { content, postId, timestamp, sender, type };
    addNotification(author.id, notification);
    incrementCounter(author.id);
  }
};

export const addCommentNotification = (user, postId, postAuthorId, comment) => {
  const [sender, content, timestamp, type] = [user, comment, -Date.now(), 'comment'];

  if (user.uid !== postAuthorId) {
    const notification = { content, postId, timestamp, sender, type };
    addNotification(postAuthorId, notification);
    incrementCounter(postAuthorId);
  }
};

export const sendAnsweredPrayerNotifications = (user, postId, post) => {
  const { content } = post;
  const [sender, timestamp, type] = [user, -Date.now(), 'answeredPrayer'];
  const notification = { content, postId, timestamp, sender, type };

  firebase.database().ref(`/postNotes/${postId}`)
    .on('value', snapshot => {
      const postNotes = snapshot.val();
      const keys = Object.keys(postNotes);
      const sent = {};
      keys.forEach(key => {
        const uid = postNotes[key].uid;
        if (!sent[uid] && uid !== user.uid) {
          addNotification(uid, notification);
          incrementCounter(uid);
          sent[uid] = true;
        }
      });
    }
  );
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

export const incrementCounter = (postAuthorId) => {
  const db = firebase.database();
  const countRef = db.ref(`/notifications/${postAuthorId}/newNotifications/count`);

  countRef.transaction((currentCount) => (currentCount || 0) + 1);
};

export const resetNotificationsCount = (userId) => {
  const db = firebase.database();
  db.ref(`/notifications/${userId}/newNotifications/count`).set(0);
};
