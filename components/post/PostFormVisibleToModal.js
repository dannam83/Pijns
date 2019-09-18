import React from 'react';
import { Text, View, Modal } from 'react-native';
import { useDispatch } from 'react-redux';

import { CardSection, Button } from '../common';
import { HIDE_VISIBLE_TO_MODAL } from '../../actions/types';

const PostFormVisibleToModal = ({ visible, route }) => {
  const {
    containerStyle, topCardSectionStyle, bottomCardSectionStyle, textStyle
  } = styles;

  const dispatch = useDispatch();

  const cancelPress = () => {
    dispatch({ type: HIDE_VISIBLE_TO_MODAL });
  };

  const savePress = () => {
    dispatch({ type: HIDE_VISIBLE_TO_MODAL });
  };

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={topCardSectionStyle}>
          <Text style={textStyle}>modal</Text>
        </CardSection>

        <CardSection style={bottomCardSectionStyle}>
          <Button onPress={cancelPress}>Cancel</Button>
          <Button onPress={savePress}>Save</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  topCardSectionStyle: {
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0
  },
  bottomCardSectionStyle: {
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderTopWidth: 0
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
