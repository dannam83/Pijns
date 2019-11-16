import React from 'react';

import PijnNote from './PijnNote';
import Comment from './Comment';
import CommentLike from './CommentLike';
import PrayerAnswered from './PrayerAnswered';
import PrayerRequest from './PrayerRequest';

const Notification = ({ item, navigation, currentUser, messageStyle }) => {
  const { type } = item;

  if (type === 'pijnNote') {
      return (
      <PijnNote
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        messageStyle={messageStyle}
      />
    );
  } else if (type === 'comment') {
      return (
      <Comment
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        messageStyle={messageStyle}
      />
    );
  } else if (type === 'commentLike') {
    return (
      <CommentLike
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        messageStyle={messageStyle}
      />
    );
  } else if (type === 'prayerAnswered') {
      return (
      <PrayerAnswered
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        messageStyle={messageStyle}
      />
    );
  } else if (type === 'prayerRequest') {
      return (
      <PrayerRequest
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        messageStyle={messageStyle}
      />
    );
  } else if (type === 'tag') {
      return (
      <Comment
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        messageStyle={messageStyle}
      />
    );
  }

  return null;
};

export default Notification;
