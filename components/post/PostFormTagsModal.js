import React, { useState } from 'react';
import { View, Modal, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import { buttonBlue } from '../../assets/colors';
import { CardSection, Button } from '../common';
import TagFriendsList from './TagFriendsList';
import {
  HIDE_TAG_FRIENDS_MODAL, POST_CREATE_UPDATE, POST_EDIT_UPDATE
} from '../../actions/types';

const PostFormVisibleToModal = ({ visible, route }) => {
  const {
    containerStyle, topCardSectionStyle, bottomCardSectionStyle
  } = styles;

  const dispatch = useDispatch();

  const donePress = () => {
    // const payload = { prop: 'visibleTo', value: visibleTo };
    // if (route === 'postEdit') {
    //   dispatch({ type: POST_EDIT_UPDATE, payload });
    // }
    // if (route === 'postCreate') {
    //   dispatch({ type: POST_CREATE_UPDATE, payload });
    // }
    dispatch({ type: HIDE_TAG_FRIENDS_MODAL });
  };

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => {}}
      animationType="slide"
    >
    <View style={containerStyle}>
      <CardSection style={topCardSectionStyle}>
        <TagFriendsList />
      </CardSection>

      <CardSection style={bottomCardSectionStyle}>
        <Button onPress={donePress}>Done</Button>
      </CardSection>
    </View>
    </Modal>
  );
};

const styles = {
  topCardSectionStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    flexDirection: 'column',
    flex: 0.8
  },
  bottomCardSectionStyle: {
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    paddingTop: 0
  },
  textStyle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 30
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.50)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    padding: 25
  }
};

export default PostFormVisibleToModal;
