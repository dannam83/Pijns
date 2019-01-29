import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';

const ActionButton = ({
  imageSource, text, onPress, disabled, iconStyle, buttonStyle
}) => {
  const {
    actionButtonStyle, actionIconStyle, disabledIconStyle, actionTextStyle
  } = styles;

  const iconDefaultStyle = disabled ? disabledIconStyle : actionIconStyle;

  return (
    <TouchableOpacity
      style={[actionButtonStyle, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Image
        source={imageSource}
        style={[iconDefaultStyle, iconStyle]}
      />
      <Text style={actionTextStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  actionButtonStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionIconStyle: {
    height: 25,
    width: 25,
  },
  disabledIconStyle: {
    height: 25,
    width: 25,
    tintColor: '#D3D3D3'
  },
  actionTextStyle: {
    // display: 'flex',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center'
  }
};

export { ActionButton };
