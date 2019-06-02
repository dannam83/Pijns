import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ActionButtonStill = ({
  text, onPress, disabled, buttonStyle, iconName, iconStyle, iconSize
}) => {
  const {
    actionButtonStyle, actionIconStyle, disabledIconStyle, actionTextStyle
  } = styles;

  const iconDefaultStyle = disabled ? disabledIconStyle : actionIconStyle;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[actionButtonStyle, buttonStyle]}>
        <AntDesign name={iconName} size={iconSize} style={[iconDefaultStyle, iconStyle]} />
        <Text style={actionTextStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

// iconStyle: {
//   alignSelf: 'center',
//   color: darkTextGray,
//   paddingLeft: 15,
//   paddingRight: 8
// }

const styles = {
  actionButtonStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  // actionIconStyle: {
  //   height: 30,
  //   width: 30,
  // },
  disabledIconStyle: {
    // height: 25,
    // width: 25,
    tintColor: '#D3D3D3'
  },
  actionTextStyle: {
  }
};

export { ActionButtonStill };
