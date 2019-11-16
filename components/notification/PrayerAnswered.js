import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { resetNotificationsCount } from '../../api/notifications_api';
import NotificationRow from './NotificationRow';

const Comment = ({ item, navigation, currentUser, messageStyle }) => {
  const { nameStyle, contentStyle } = styles;
  const { content, postId, sender } = item;
  const { name } = sender;
  const [redirect, userId] = [navigation.navigate, currentUser.uid];

  const messageIntro = 'has an answered prayer that you prayed for!';

  const message = () => {
    return (
      <Text style={messageStyle}>
        <Text style={nameStyle}>{name} </Text>
         {messageIntro}
        <Text style={contentStyle}> "{content}"</Text>
      </Text>
    );
  };

  const goToPost = async () => {
    resetNotificationsCount(currentUser.uid);

    navigation.navigate('PostScreen', {
      user: currentUser,
      postAuthorId: userId,
      postId,
      redirect,
    });
  };

  return (
    <NotificationRow
      item={item}
      message={message}
      onPress={goToPost}
      userId={userId}
    />
  );
};

const styles = StyleSheet.create({
  nameStyle: {
    fontWeight: '600'
  },
  contentStyle: {
    fontStyle: 'italic'
  }
});

export default Comment;
