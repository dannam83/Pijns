import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';

import { displayTimeAgo } from '../../functions/common';

const NoteListItem = ({ note, onPress }) => {
  const { name, picture, timestamp, createdOn } = note;
  const {
    viewStyle, textViewStyle, nameTextStyle, dateTextStyle, imageStyle
  } = styles;
  const timeAgo = displayTimeAgo(timestamp, createdOn);

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
