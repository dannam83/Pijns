import firebase from 'firebase';
import axios from 'axios';

export const savePushToken = (userId, pushToken) => {
  const db = firebase.database();
  db.ref(`/pushTokens/${userId}`).set(pushToken);
};

export const sendPushNotification = async (recipientId) => {
  firebase.database().ref(`/pushTokens/${recipientId}`)
    .once('value', async snapshot => {
      const recipientPushToken = snapshot.val();
      if (!recipientPushToken) { return; }

      const message = {
        to: recipientPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' },
      };

      const response = await axios.post('https://exp.host/--/api/v2/push/send', {
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      const data = response._bodyInit;
      console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
    }
  );
};
