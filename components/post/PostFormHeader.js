import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { ButtonAsText } from '../common';
import { buttonBlue, darkGray } from '../../assets/colors';
import PostFormVisibleToModal from './PostFormVisibleToModal';
// import PostFormTagsModal from './PostFormTagsModal';
import { SHOW_VISIBLE_TO_MODAL } from '../../actions/types';

const PostFormHeader = ({
  user, visibleTo, taggedFriends = {}, route, redirect, update
}) => {
  const { picture } = user;
  const {
    containerStyle,
    thumbnailStyle,
    headerContentStyle,
    labelStyle,
    buttonStyle,
  } = styles;

  const [tagged, setTagged] = useState(taggedFriends);

  const visibleToModal = useSelector(state => state.modals).visibleTo;
  // const tagFriendsModal = useSelector(state => state.modals).tagFriends;
  const dispatch = useDispatch();

  const editVisibleTo = () => {
    dispatch({ type: SHOW_VISIBLE_TO_MODAL });
  };

  const editTags = () => {
    const namespace = route === 'postEdit' ? 'Profile' : 'PostCreate';
    redirect(`${namespace}_TagFriends`, {
      update, route, taggedFriends: tagged, setTagged
    });
  };

  const tagFriends = () => {
    if (!tagged) { return 'None'; }
    let isTagged = _.filter(tagged, (friend) => {
      return friend.tagged;
    });
    const count = _.size(isTagged);
    if (count < 1) { return 'None'; }
    return `${count.toString()} ${count > 1 ? 'Friends' : 'Friend'}`;
  };
  
  return (
    <View style={containerStyle}>
      <PostFormVisibleToModal
        currentVisibleTo={visibleTo}
        visible={visibleToModal}
        route={route}
      />
      <Image style={thumbnailStyle} source={{ uri: picture }} />
      <View style={headerContentStyle}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={labelStyle}>Visible to: </Text>
          <ButtonAsText
            editTextStyle={buttonStyle}
            onPress={editVisibleTo}
          >
            {visibleTo}
          </ButtonAsText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={labelStyle}>Tagged: </Text>
          <ButtonAsText
            editTextStyle={buttonStyle}
            onPress={editTags}
          >
            {tagFriends()}
          </ButtonAsText>
        </View>
      </View>
    </View>
  );
};
// <PostFormTagsModal
//   currentTags={taggedFriends}
//   visible={tagFriendsModal}
//   route={route}
//   />

const styles = {
  containerStyle: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 10
  },
  headerAuthorStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '100',
    color: darkGray,
  },
  buttonStyle: {
    fontSize: 14,
    fontWeight: '700',
    color: buttonBlue,
    fontStyle: 'italic'
  },
  thumbnailStyle: {
    height: 35,
    width: 35,
    borderRadius: 17
  },
  dotStyle: {
    fontSize: 13,
    fontWeight: '800',
    color: 'gray',
    paddingRight: 10
  }
};

export default PostFormHeader;
