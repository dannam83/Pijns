import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ActionButton = ({
  imageSource, text, onPress, disabled, iconStyle, buttonStyle
}) => {
  const {
    actionButtonStyle, iconDefaultStyle, actionTextStyle
  } = styles;

  const tintColor = (
    !disabled || (imageSource && imageSource.uri)
  ) ? {} : { tintColor: '#D3D3D3' };

  return (
    <TouchableOpacity
      style={[actionButtonStyle, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Image
        source={imageSource}
        style={[iconDefaultStyle, tintColor, iconStyle]}
      />
      <Text style={actionTextStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButtonStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconDefaultStyle: {
    height: 25,
    width: 25,
  },
  disabledIconStyle: {
    height: 25,
    width: 25,
    tintColor: '#D3D3D3'
  },
  actionTextStyle: {
  }
});

export { ActionButton };
