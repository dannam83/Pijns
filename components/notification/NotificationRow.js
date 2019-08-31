import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { ListItemAsButton } from '../../components/common';
import { displayTimeAgoShort } from '../../functions/common';
import { timeAgoShortGray, backgroundLightBlue } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const NotificationRow = ({ item, message, onPress }) => {
  const {
    notificationStyle, itemAsButtonStyle, messageStyle, timeViewStyle, timeStyle
  } = styles;
  const { timestamp, sender, seen } = item;
  const { picture } = sender;
  const backgroundColor = seen ? 'white' : '#ebf7ff';

  return (
    <View style={{ ...notificationStyle, backgroundColor }}>
      <ListItemAsButton
        text={message()}
        imageSource={picture}
        onPress={onPress}
        viewRestyle={itemAsButtonStyle}
        textRestyle={messageStyle}
        numberOfLines={3}
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
  },
  itemAsButtonStyle: {
    paddingBottom: 7
  },
  messageStyle: {
    fontSize: 16,
    width: SCREEN_WIDTH - 120
  },
  timeViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5
  },
  timeStyle: {
    paddingBottom: 6.5,
    fontWeight: '400',
    fontSize: 14,
    color: timeAgoShortGray
  },
};

export default NotificationRow;
