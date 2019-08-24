import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';

const ListItemAsButton = ({
  imageSource,
  text,
  onPress,
  disabled,
  imageRestyle,
  viewRestyle,
  textRestyle,
  numberOfLines
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
          source={{ uri: `${imageSource}?type=large` }}
          style={[imageStyle, imageRestyle]}
        />
        <Text
          style={[textStyle, textRestyle]}
          numberOfLines={numberOfLines}
        >
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
    paddingBottom: 16,
    paddingTop: 1
  },
  imageStyle: {
    height: 64,
    width: 64,
    borderRadius: 32
  },
  textStyle: {
    paddingLeft: 8,
    fontSize: 16
  }
};

export { ListItemAsButton };
