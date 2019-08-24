import React from 'react';
import { Text } from 'react-native';

import { resetNotificationsCount } from '../../api/notifications';
import NotificationRow from './NotificationRow';

const PijnNote = ({ item, navigation, navigationTab, currentUser, screenWidth }) => {
  const { messageStyle, nameStyle, contentStyle } = styles;
  const { content, postId, sender } = item;
  const { name } = sender;

  const messageIntro = 'sent you a pijn note! You received prayer for';

  const message = () => {
    return (
      <Text style={{ ...messageStyle, width: screenWidth - 120 }}>
        <Text style={nameStyle}>{name} </Text>
         {messageIntro}
        <Text style={contentStyle}> "{content}"</Text>
      </Text>
    );
  };

  const goToPostNotes = () => {
    resetNotificationsCount(currentUser.uid);
    const [user, postAuthorId] = [currentUser, currentUser.uid];

    navigation.push(`${navigationTab}_Notes`, {
      user, postAuthorId, postId, navigationTab
    });
  };

  return (
    <NotificationRow
      item={item}
      message={message}
      onPress={goToPostNotes}
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

export default PijnNote;
