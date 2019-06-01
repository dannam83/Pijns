import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ButtonAsField = ({
  onPress, disabled, children, buttonRestyle, textRestyle, iconName, iconRestyle
}) => {
  const { buttonStyle, textStyle, iconStyle } = styles;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[buttonStyle, buttonRestyle]}>
        <AntDesign name={iconName} size={18} style={[iconStyle, iconRestyle]} />
        <Text style={[textStyle, textRestyle]}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  iconStyle: {
    alignSelf: 'center',
  }
};

export { ButtonAsField };
