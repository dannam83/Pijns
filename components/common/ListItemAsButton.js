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
    alignItems: 'center',
    paddingBottom: 10
  },
  imageStyle: {
    height: 47,
    width: 47,
    borderRadius: 25
  },
  textStyle: {
    paddingLeft: 8,
    fontSize: 16
  }
};

export { ListItemAsButton };
