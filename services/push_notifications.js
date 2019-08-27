import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';

export default async () => {
  if (Constants.isDevice) {
    let previousToken = await AsyncStorage.getItem('pushToken');
    if (previousToken) { return; }

    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') { return; }

    let token = await Notifications.getExpoPushTokenAsync();
    AsyncStorage.setItem('push_token', token);

  //   const { status: existingStatus } = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS
  //   );
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== 'granted') {
  //     const { status } = await Permissions.askAsync(
  //       Permissions.NOTIFICATIONS
  //     );
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //     alert('Failed to get push token for push notification!');
  //     return;
  //   }
  //   let token = await Notifications.getExpoPushTokenAsync();
  //   console.log(token);
  } else {
    console.warn('Must use physical device for Push Notifications');
  }
};
