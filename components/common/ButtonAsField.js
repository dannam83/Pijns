import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { darkGray, buttonFieldBorderGray } from '../../assets/colors';

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
    alignSelf: 'flex-start',
    color: darkGray,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: buttonFieldBorderGray,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  iconStyle: {
    alignSelf: 'center',
    color: darkGray,
    paddingLeft: 15,
    paddingRight: 8
  }
};

export { ButtonAsField };
