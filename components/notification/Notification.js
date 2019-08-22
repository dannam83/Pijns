import React from 'react';
import { Dimensions } from 'react-native';

import PijnNote from './PijnNote';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Notification = ({ item, navigation, navigationTab, currentUser }) => {
  if (item.count || item.count === 0) { return null; }

  return (
    <PijnNote
      item={item}
      navigation={navigation}
      navigationTab={navigationTab}
      currentUser={currentUser}
      screenWidth={SCREEN_WIDTH}
    />
  );
};

export default Notification;
