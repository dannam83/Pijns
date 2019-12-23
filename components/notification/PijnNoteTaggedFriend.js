import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { resetNotificationsCount } from '../../api/notifications_api';
import NotificationRow from './NotificationRow';

const PijnNote = ({ item, navigation, currentUser, messageStyle }) => {
  const { nameStyle, contentStyle } = styles;
  const { content, postId, sender } = item;
  const { name } = sender;

  const messageIntro = "sent a pijn note for a prayer request you're tagged in:";

  const message = () => {
    return (
      <Text style={messageStyle}>
        <Text style={nameStyle}>{name} </Text>
         {messageIntro}
        <Text style={contentStyle}> "{content}"</Text>
      </Text>
    );
  };

  const goToPostNotes = () => {
    resetNotificationsCount(currentUser.uid);
    const [user, postAuthorId] = [currentUser, currentUser.uid];

    navigation.push('PostNotesListScreen', { user, postAuthorId, postId });
  };

  return (
    <NotificationRow
      item={item}
      message={message}
      onPress={goToPostNotes}
      userId={currentUser.uid}
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

export default PijnNote;
