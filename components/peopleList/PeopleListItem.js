import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, View, StyleSheet } from 'react-native';

import { displayTimeAgoShort } from '../../functions/common';

const PeopleListItem = ({ person, onPress }) => {
  const { name, picture, timestamp, createdOn } = person;

  const [onItemPress] = useState(() => onPress);
  const [displayName] = useState(name);
  const [displayPicture] = useState(picture);
  const [timeAgo] = useState(displayTimeAgoShort(timestamp, createdOn));

  const {
    viewStyle, textViewStyle, nameTextStyle, dateTextStyle, imageStyle
  } = styles;

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View style={viewStyle}>
        <Image
          source={{ uri: displayPicture }}
          style={imageStyle}
        />
        <View style={textViewStyle}>
          <Text style={nameTextStyle}>{displayName}</Text>
          {
            timeAgo ? <Text style={dateTextStyle}>{timeAgo}</Text> : null
          }

        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export { PeopleListItem };
