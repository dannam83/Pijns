import firebase from 'firebase';

export const savePushToken = (userId, pushToken) => {
  const db = firebase.database();
  db.ref(`/pushTokens/${userId}`).set(pushToken);
};

export const sendPushNotification = async (recipientId, notification) => {
  firebase.database().ref(`/pushTokens/${recipientId}`)
    .once('value', async snapshot => {
      const recipientPushToken = snapshot.val();
      if (!recipientPushToken) { return; }

      return fetch('https://exp.host/--/api/v2/push/send', {
        body: JSON.stringify({
          to: recipientPushToken,
          body: notification,
          sound: 'default',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }
  );
};
