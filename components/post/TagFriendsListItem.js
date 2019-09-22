import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { displayTimeAgoShort } from '../../functions/common';
import { darkTextGray, buttonFieldBorderGray } from '../../assets/colors';

const TagFriendsListItem = ({ friend, onPress }) => {
  const { name, picture, timestamp, createdOn } = friend;
  const {
    viewStyle, textViewStyle, nameTextStyle, dateTextStyle, imageStyle
  } = styles;
  const timeAgo = displayTimeAgoShort(timestamp, createdOn);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={viewStyle}>
        <CheckBox
          containerStyle={{ borderWidth: 0, backgroundColor: 'white', padding: 0, margin: 0 }}
          textStyle={{ width: 0, padding: 0, margin: 0 }}
          checked={true}
          // onPress={() => setVisibleTo(value)}
          // uncheckedIcon='circle-o'
          // checkedIcon='dot-circle-o'
          // checkedColor={buttonBlue}
        />
        <Image
          source={{ uri: picture }}
          style={imageStyle}
        />
        <View style={textViewStyle}>
          <Text style={nameTextStyle}>{name}</Text>
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
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: buttonFieldBorderGray,
  },
  imageStyle: {
    height: 28,
    width: 28,
    borderRadius: 14,
    marginLeft: -17
  },
  textViewStyle: {
    paddingLeft: 11,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
  },
  nameTextStyle: {
    fontSize: 16,
    fontWeight: '400'
  },
};

export default TagFriendsListItem;
