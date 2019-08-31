import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';

import { displayTimeAgoShort } from '../../functions/common';

const PeopleListItem = ({ person, onPress }) => {
  const { name, picture, timestamp, createdOn } = person;
  const {
    viewStyle, textViewStyle, nameTextStyle, dateTextStyle, imageStyle
  } = styles;
  const timeAgo = displayTimeAgoShort(timestamp, createdOn);

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
    height: 36,
    width: 36,
    borderRadius: 18
  },
  textViewStyle: {
    paddingLeft: 10,
    height: 36,
    display: 'flex',
    justifyContent: 'space-between',
  },
  nameTextStyle: {
    fontSize: 16,
    fontWeight: '500'
  },
  dateTextStyle: {
    fontSize: 14,
    fontWeight: '100',
    color: 'gray',
  },
};

export { PeopleListItem };
