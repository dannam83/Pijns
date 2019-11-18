import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';

import { savePushToken } from '../api/push_notifications_api';

export default async (userId) => {
  if (Constants.isDevice) {
    let previousToken = await AsyncStorage.getItem('pushToken');
    if (previousToken) { return; }

    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') { return; }

    let token = await Notifications.getExpoPushTokenAsync();
    savePushToken(userId, token);
    AsyncStorage.setItem('push_token', token);
  } else {
    console.warn('Must use physical device for Push Notifications');
  }
};
