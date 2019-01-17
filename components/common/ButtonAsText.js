import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonAsText = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#282828',
    // fontSize: 16,
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: 'white',
  }
};

export { ButtonAsText };
