import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import { CardSection, Button } from '../common';
import { saveVisibleTo } from '../../api/posts_api';
import { buttonBlue } from '../../assets/colors';
import {
  HIDE_VISIBLE_TO_MODAL, POST_CREATE_UPDATE, POST_EDIT_UPDATE
} from '../../actions/types';

const PostFormVisibleToModal = ({ postId, visible, route, currentVisibleTo }) => {
  const [visibleTo, setVisibleTo] = useState(currentVisibleTo);

  const {
    containerStyle, topCardSectionStyle, bottomCardSectionStyle
  } = styles;

  const dispatch = useDispatch();

  const savePress = () => {
    const payload = { prop: 'visibleTo', value: visibleTo };
    if (route === 'postEdit') {
      saveVisibleTo(postId, visibleTo);
      dispatch({ type: POST_EDIT_UPDATE, payload });
    }
    if (route === 'postCreate') {
      dispatch({ type: POST_CREATE_UPDATE, payload });
    }
    dispatch({ type: HIDE_VISIBLE_TO_MODAL });
  };

  const Choice = ({ value }) => {
    return (
      <CheckBox
        title={value}
        checked={visibleTo === value}
        onPress={() => setVisibleTo(value)}
        uncheckedIcon='circle-o'
        checkedIcon='dot-circle-o'
        checkedColor={buttonBlue}
      />
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={topCardSectionStyle}>
          <Choice value='Anyone' />
          <Choice value='All Friends' />
          <Choice value='Tagged Friends' />
          <Choice value='Only Me' />
        </CardSection>

        <CardSection style={bottomCardSectionStyle}>
          <Button onPress={savePress}>Done</Button>
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
