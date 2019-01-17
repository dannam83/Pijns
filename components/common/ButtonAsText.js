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
    display: 'flex',
    flexDirection: 'column',
    // alignSelf: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#282828',
    backgroundColor: 'red'
    // fontSize: 16,
  },
  buttonStyle: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  }
};

export { ButtonAsText };
