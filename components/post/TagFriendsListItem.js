import React, { useState } from 'react';
import { Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { displayTimeAgoShort } from '../../functions/common';
import { darkTextGray, buttonFieldBorderGray } from '../../assets/colors';

const TagFriendsListItem = ({ friend, onPress }) => {
  const { name, picture, timestamp, createdOn } = friend;
  const {
    viewStyle, textViewStyle, nameTextStyle, dateTextStyle, imageStyle
  } = styles;

  const [checked, setChecked] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
      <View style={viewStyle}>
        <CheckBox
          containerStyle={{ borderWidth: 0, backgroundColor: 'white', padding: 0, margin: 0 }}
          textStyle={{ width: 0, padding: 0, margin: 0 }}
          checked={checked}
          uncheckedIcon='square'
          checkedIcon='check-square'
          onPress={() => setChecked(!checked)}
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
    </TouchableWithoutFeedback>
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
    marginLeft: -16
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
