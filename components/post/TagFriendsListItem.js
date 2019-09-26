import React, { useState } from 'react';
import { Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import _ from 'lodash';

// import { displayTimeAgoShort } from '../../functions/common';
import { buttonFieldBorderGray } from '../../assets/colors';

const TagFriendsListItem = ({ friend, update, route, checked, tags, tagsCount, setTagsCount }) => {
  const { name, picture } = friend;
  const {
    viewStyle, textViewStyle, nameTextStyle, imageStyle
  } = styles;
  // const [currentTags, setCurrentTags] = useState(tags);

  // const [checked, setChecked] = useState(false);
  // const taggedFriends = route === 'postEdit'
  //  ? useSelector(state => state.postEdit).taggedFriends || {}
  //  : useSelector(state => state.postCreate).taggedFriends || {};
  const [count, setCount] = useState(tagsCount);

  const onPress = () => {
    const { uid } = friend;
    const isTagged = tags[uid] && tags[uid].tagged;
    _.set(tags, [friend.uid], friend);
    _.set(tags, [friend.uid, 'tagged'], !isTagged);

    console.log('start', count, isTagged);
    if (!isTagged) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
    console.log('after', count);

    setTagsCount(count);

    // _.set(taggedFriends, [friend.uid], friend);
    // _.set(taggedFriends, [friend.uid, 'tagged'], !isTagged);
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
