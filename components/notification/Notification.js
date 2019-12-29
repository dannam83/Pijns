import React from 'react';

import PijnNote from './PijnNote';
import PijnNoteTaggedFriend from './PijnNoteTaggedFriend';
import Comment from './Comment';
import CommentTaggedFriend from './CommentTaggedFriend';
import CommentLike from './CommentLike';
import PostLike from './PostLike';
import PostLikeTaggedFriend from './PostLikeTaggedFriend';
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
  } else if (type === 'pijnNoteTaggedFriend') {
      return (
      <PijnNoteTaggedFriend
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
  } else if (type === 'commentTaggedFriend') {
      return (
      <CommentTaggedFriend
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
  } else if (type === 'postLike') {
    return (
      <PostLike
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        messageStyle={messageStyle}
      />
    );
  } else if (type === 'postLikeTaggedFriend') {
    return (
      <PostLikeTaggedFriend
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
