import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { ListItemAsButton } from '../../components/common';
import { displayTimeAgoShort } from '../../functions/common';
import { timeAgoShortGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const NotificationRow = ({ item, message, onPress }) => {
  const {
    notificationStyle, messageStyle, timeViewStyle, timeStyle
  } = styles;
  const { timestamp, sender } = item;
  const { picture } = sender;

  return (
    <View style={notificationStyle}>
      <ListItemAsButton
        text={message()}
        imageSource={picture}
        onPress={onPress}
        textRestyle={messageStyle}
        numberOfLines={2}
      />
      <View style={timeViewStyle}>
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
    fontSize: 15,
    width: SCREEN_WIDTH - 111
  },
  timeViewStyle: {
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

export default NotificationRow;
