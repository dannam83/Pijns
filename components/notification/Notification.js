import React from 'react';
import { Dimensions } from 'react-native';

import PijnNote from './PijnNote';
import Comment from './Comment';
import AnsweredPrayer from './AnsweredPrayer';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Notification = ({ item, navigation, navigationTab, currentUser }) => {
  const { type } = item;

  if (type === 'pijnNote') {
      return (
      <PijnNote
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  } else if (type === 'comment') {
      return (
      <Comment
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  } else if (type === 'answeredPrayer') {
      return (
      <AnsweredPrayer
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  } else if (type === 'commentLike') {
      return (
      <Comment
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  } else if (type === 'message') {
      return (
      <Comment
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  } else if (type === 'tagged') {
      return (
      <Comment
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  }

  return null;
};

export default Notification;
