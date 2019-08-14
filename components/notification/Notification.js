import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { ListItemAsButton } from '../../components/common';
import { resetNotificationsCount } from '../../api/notifications';
import { displayTimeAgoShort } from '../../functions/common';
import { timeAgoShortGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Notification = ({ item, navigation, navigationTab, currentUser }) => {
  if (item.count || item.count === 0) { return null; }

  const {
    notificationStyle, messageStyle, nameStyle, contentStyle, xViewStyle, timeStyle
  } = styles;
  const { content, postId, timestamp, sender, type } = item;
  const { name, picture } = sender;

  const messageIntro = () => {
    if (type === 'pijnNote') {
      return 'sent you a pijn note! You received prayer for';
    } else if (type === 'comment') {
      return 'wrote a comment:';
    }
  };

  const message = () => {
    return (
      <Text style={messageStyle}>
        <Text style={nameStyle}>{name} </Text>
         {messageIntro()}
        <Text style={contentStyle}> "{content}"</Text>
      </Text>
    );
  };

  const goToPostNotes = () => {
    resetNotificationsCount(currentUser.uid);
    const [user, postAuthorId] = [currentUser, currentUser.uid];
    
    navigation.navigate(`${navigationTab}_Notes`, {
      user, postAuthorId, postId, navigationTab
    });
  };

  return (
    <View style={notificationStyle}>
      <ListItemAsButton
        text={message()}
        imageSource={picture}
        onPress={goToPostNotes}
        textRestyle={messageStyle}
        numberOfLines={2}
      />
      <View style={xViewStyle}>
        <Text style={timeStyle}>{displayTimeAgoShort(timestamp)}</Text>
      </View>
    </View>
  );
};

const styles = {
  notificationStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  messageStyle: {
    width: SCREEN_WIDTH - 111,
    fontSize: 15
  },
  nameStyle: {
    fontWeight: '600'
  },
  contentStyle: {
    fontStyle: 'italic'
  },
  xViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    paddingRight: 5
  },
  timeStyle: {
    paddingBottom: 2,
    fontWeight: '400',
    fontSize: 14,
    color: timeAgoShortGray
  },
};

export default Notification;
