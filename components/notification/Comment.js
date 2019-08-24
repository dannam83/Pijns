import React from 'react';
import { Text } from 'react-native';

import { resetNotificationsCount } from '../../api/notifications';
import { setActivePost } from '../../actions';
import NotificationRow from './NotificationRow';

const Comment = ({ item, navigation, navigationTab, currentUser, screenWidth }) => {
  const { messageStyle, nameStyle, contentStyle } = styles;
  const { content, postId, sender } = item;
  const { name } = sender;

  const messageIntro = 'wrote a comment:';

  const message = () => {
    return (
      <Text style={{ ...messageStyle, width: screenWidth - 120 }}>
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

    navigation.navigate(`${navigationTab}_Post`, {
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
    fontSize: 17,
    lineHeight: 22
  },
  nameStyle: {
    fontWeight: '600'
  },
  contentStyle: {
    fontStyle: 'italic'
  }
};

export default Comment;
