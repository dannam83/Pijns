import React from 'react';
import { Text } from 'react-native';

import { resetNotificationsCount } from '../../api/notifications';
import { setActivePost } from '../../actions';
import NotificationRow from './NotificationRow';

const CommentLike = ({ item, navigation, navigationTab, currentUser, screenWidth }) => {
  const { messageStyle, nameStyle, contentStyle } = styles;
  const { content, postId, sender } = item;
  const { name } = sender;

  const messageIntro = 'liked your comment:';

  const message = () => {
    return (
      <Text style={{ ...messageStyle, width: screenWidth - 111 }}>
        <Text style={nameStyle}>{name} </Text>
         {messageIntro}
        <Text style={contentStyle}> "{content}"</Text>
      </Text>
    );
  };

  const goToPost = async () => {
    resetNotificationsCount(currentUser.uid);
    const [redirect, userId] = [navigation.navigate, currentUser.uid];

    await setActivePost({ postId, postAuthor: currentUser });

    navigation.push(`${navigationTab}_Post`, {
      user: currentUser, postAuthorId: userId, postId, redirect, navigationTab
    });
  };

  return (
    <NotificationRow
      item={item}
      message={message}
      onPress={goToPost}
    />
  );
};

const styles = {
  messageStyle: {
    fontSize: 15
  },
  nameStyle: {
    fontWeight: '600'
  },
  contentStyle: {
    fontStyle: 'italic'
  }
};

export default CommentLike;
