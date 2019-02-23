import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';

const NoteListItem = ({ note, onPress }) => {
  const { name, picture, timestamp, createdOn } = note;
  const {
    viewStyle, textViewStyle, nameTextStyle, dateTextStyle, imageStyle
  } = styles;
  const timeAgo = formatTimeAgo(timestamp, createdOn);

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={viewStyle}>
        <Image
          source={{ uri: picture }}
          style={imageStyle}
        />
        <View style={textViewStyle}>
          <Text style={nameTextStyle}>{name}</Text>
          <Text style={dateTextStyle}>{timeAgo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const formatTimeAgo = (timestamp, createdOn) => {
  const secondsAgoPosted = Math.floor((Date.now() + timestamp) / 1000);

  if (secondsAgoPosted < 60) {
    return `${secondsAgoPosted} second${secondsAgoPosted === 1 ? '' : 's'} ago`;
  }
  const minutesAgoPosted = Math.floor(secondsAgoPosted / 60);
  if (minutesAgoPosted < 60) {
    return `${minutesAgoPosted} minute${minutesAgoPosted === 1 ? '' : 's'} ago`;
  }
  const hoursAgoPosted = Math.floor(minutesAgoPosted / 60);
  if (hoursAgoPosted < 24) {
    return `${hoursAgoPosted} hour${hoursAgoPosted === 1 ? '' : 's'} ago`;
  }
  const daysAgoPosted = Math.floor(hoursAgoPosted / 24);
  if (daysAgoPosted < 30) {
    return `${daysAgoPosted} day${daysAgoPosted === 1 ? '' : 's'} ago`;
  }
  return createdOn;
};

const styles = {
  viewStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  imageStyle: {
    height: 47,
    width: 47,
    borderRadius: 25
  },
  textViewStyle: {
    paddingLeft: 10,
    height: 47,
    display: 'flex',
    justifyContent: 'space-around',
  },
  nameTextStyle: {
    fontSize: 16,
    fontWeight: '400'
  },
  dateTextStyle: {
    fontSize: 14,
    fontWeight: '100',
    color: 'gray',
  },
};

export { NoteListItem };
