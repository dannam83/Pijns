import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const {
    containerStyle, topCardSectionStyle, bottomCardSectionStyle, textStyle
  } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={topCardSectionStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>

        <CardSection style={bottomCardSectionStyle}>
          <Button onPress={onDecline}>No</Button>
          <Button onPress={onAccept}>Yes</Button>
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
    borderWidth: 2,
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

export { Confirm };
