import React from 'react';
import { Text } from 'react-native';

import { resetNotificationsCount } from '../../api/notifications_api';
import NotificationRow from './NotificationRow';

const CommentLike = ({
  item, navigation, navigationTab, currentUser, messageStyle
}) => {
  const { nameStyle, contentStyle } = styles;
  const { content, postId, sender } = item;
  const { name } = sender;
  const [redirect, userId] = [navigation.navigate, currentUser.uid];

  const messageIntro = 'liked your comment:';

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

    navigation.navigate(`${navigationTab}_Post`, {
      user: currentUser,
      postAuthorId: userId,
      postId,
      redirect,
      navigationTab
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

const styles = {
  nameStyle: {
    fontWeight: '600'
  },
  contentStyle: {
    fontStyle: 'italic'
  }
};

export default CommentLike;
