import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';

const ListItemAsButton = ({
  imageSource, text, onPress, disabled, imageRestyle, viewRestyle
}) => {
  const {
    viewStyle, textStyle, imageStyle
  } = styles;

  return (
    <TouchableOpacity
      // style={[buttonStyle, buttonRestyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[viewStyle, viewRestyle]}>
        <Image
          source={{ uri: imageSource }}
          style={[imageStyle, imageRestyle]}
        />
        <Text style={textStyle}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  viewStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageStyle: {
    height: 47,
    width: 47,
    borderRadius: 25
  },
  textStyle: {
    paddingLeft: 5,
    fontSize: 16
  }
};

export { ListItemAsButton };
