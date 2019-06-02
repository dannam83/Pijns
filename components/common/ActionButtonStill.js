import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ActionButtonStill = ({
  text, onPress, disabled, buttonStyle, iconName, iconStyle, iconSize
}) => {
  const {
    actionButtonStyle, disabledIconStyle, actionTextStyle
  } = styles;

  const iconDefaultStyle = disabled ? disabledIconStyle : {};

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[actionButtonStyle, buttonStyle]}>
        <AntDesign name={iconName} size={iconSize} style={[iconDefaultStyle, iconStyle]} />
        <Text style={actionTextStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  actionButtonStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  disabledIconStyle: {
    tintColor: '#D3D3D3'
  },
  actionTextStyle: {
  }
};

export { ActionButtonStill };
