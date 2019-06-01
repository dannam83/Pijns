import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Button = ({
  onPress,
  disabled,
  children,
  buttonRestyle,
  textRestyle,
  iconName,
  iconRestyle,
  opacity
}) => {
  const { buttonStyle, textStyle, iconStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle, buttonRestyle]}
      disabled={disabled}
      setOpacityTo={opacity}
    >
      <AntDesign name={iconName} size={18} style={[iconStyle, iconRestyle]} />
      <Text style={[textStyle, textRestyle]}>
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
    width: 120,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row'
  },
  iconStyle: {
    alignSelf: 'center',
  }
};

export { Button };
