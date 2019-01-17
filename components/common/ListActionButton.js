import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';

const ListActionButton = ({ imageSource, text }) => {
  const { actionButtonStyle, actionIconStyle, actionTextStyle } = styles;

  return (
    <TouchableOpacity style={actionButtonStyle}>
      <Image
        source={imageSource}
        style={actionIconStyle}
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
    height: 20,
    width: 20,
    marginRight: 5
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
