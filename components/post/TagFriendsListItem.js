import React from 'react';
import { Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import _ from 'lodash';

import { buttonFieldBorderGray } from '../../assets/colors';

const TagFriendsListItem = ({ friend, update, route, checked, tags }) => {
  const { name, picture } = friend;
  const {
    viewStyle, textViewStyle, nameTextStyle, imageStyle
  } = styles;

  const tagCount = route === 'postEdit'
   ? useSelector(state => state.postEdit.tagCount) || 0
   : useSelector(state => state.postCreate.tagCount) || 0;

  const onPress = () => {
    const { uid } = friend;
    const isTagged = tags[uid] && tags[uid].tagged;
    _.set(tags, [friend.uid], friend);
    _.set(tags, [friend.uid, 'tagged'], !isTagged);

    if (!isTagged) {
      update({ prop: 'tagCount', value: tagCount + 1 });
    } else {
      update({ prop: 'tagCount', value: tagCount - 1 });
    }

    update({ prop: 'taggedFriends', value: tags });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={viewStyle}>
        <CheckBox
          containerStyle={{ borderWidth: 0, backgroundColor: 'white', padding: 0, margin: 0 }}
          textStyle={{ width: 0, padding: 0, margin: 0 }}
          checked={checked}
          uncheckedIcon='square'
          checkedIcon='check-square'
          onPress={onPress}
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
