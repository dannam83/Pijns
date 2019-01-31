import React from 'react';
import { TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize,
  iconName,
  containerRestyle,
  inputRestyle,
  autoFocus
}) => {
  const { inputStyle, containerStyle, iconStyle } = styles;

  return (
    <View style={[containerStyle, containerRestyle]}>
      <AntDesign name={iconName} size={18} style={iconStyle} />
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={[inputStyle, inputRestyle]}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    alignItems: 'center',
    marginBottom: 10
  },
  inputStyle: {
    flex: 0.9,
    paddingRight: 5,
    paddingLeft: 10,
    fontSize: 16,
    lineHeight: 23,
  },
  iconStyle: {
    paddingLeft: 15,
  }
};

export { Input };
