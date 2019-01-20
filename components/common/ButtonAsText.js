import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonAsText = ({ onPress, children, disabled, editTextStyle }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} disabled={disabled}>
      <Text style={[textStyle, editTextStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#282828',
    fontSize: 17,
  },
  buttonStyle: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    paddingRight: 10
  }
};

export { ButtonAsText };
