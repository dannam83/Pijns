import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';

const ListActionButton = ({ imageSource, text, iconStyle, onPress, disabled }) => {
  const { actionButtonStyle, actionIconStyle, actionTextStyle } = styles;

  return (
    <TouchableOpacity style={actionButtonStyle} onPress={onPress} disabled={disabled}>
      <Image
        source={imageSource}
        style={[actionIconStyle, iconStyle]}
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
  actionTextStyle: {
    // display: 'flex',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center'
  }
};

export { ListActionButton };
