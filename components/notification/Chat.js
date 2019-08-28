import React from 'react';
import { Text } from 'react-native';

import { resetNotificationsCount } from '../../api/notifications_api';
import NotificationRow from './NotificationRow';

const Chat = ({
  item, navigation, navigationTab, currentUser, screenWidth
}) => {
  const { messageStyle, nameStyle, contentStyle } = styles;
  const { content, sender } = item;
  const { name } = sender;

  const messageIntro = ':';

  const message = () => {
    return (
      <Text style={{ ...messageStyle, width: screenWidth - 120 }}>
        <Text style={nameStyle}>{name} </Text>
         {messageIntro}
        <Text style={contentStyle}> "{content}"</Text>
      </Text>
    );
  };

  const goToChat = async () => {
    resetNotificationsCount(currentUser.uid);
    const [user, postAuthorId] = [currentUser, sender.uid];

    navigation.navigate(`${navigationTab}_Chat`, {
      user, postAuthorId, redirect: navigation.navigate
    });
  };

  return (
    <NotificationRow
      item={item}
      message={message}
      onPress={goToChat}
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

export default Chat;
