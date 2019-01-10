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
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5
  }
};

export { ButtonAsText };
