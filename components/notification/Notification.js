import React from 'react';
import { Dimensions } from 'react-native';

import PijnNote from './PijnNote';
import Comment from './Comment';
import CommentLike from './CommentLike';
import PrayerAnswered from './PrayerAnswered';
import PrayerRequest from './PrayerRequest';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Notification = ({ item, navigation, navigationTab, currentUser, fetchActivePost }) => {
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
        fetchActivePost={fetchActivePost}
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
        fetchActivePost={fetchActivePost}
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
