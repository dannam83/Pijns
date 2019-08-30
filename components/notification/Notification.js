import React from 'react';
import { Dimensions } from 'react-native';

import PijnNote from './PijnNote';
import Comment from './Comment';
import CommentLike from './CommentLike';
import PrayerAnswered from './PrayerAnswered';
import PrayerRequest from './PrayerRequest';

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
  } else if (type === 'commentLike') {
    return (
      <CommentLike
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  } else if (type === 'prayerAnswered') {
      return (
      <PrayerAnswered
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  } else if (type === 'prayerRequest') {
      return (
      <PrayerRequest
        item={item}
        navigation={navigation}
        navigationTab={navigationTab}
        currentUser={currentUser}
        screenWidth={SCREEN_WIDTH}
      />
    );
  } else if (type === 'tag') {
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
