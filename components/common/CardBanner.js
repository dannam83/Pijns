import React from 'react';
import { Text, View, Image } from 'react-native';

const CardBanner = ({ author }) => {
  const { id, name, picture } = author;

  const {
    containerStyle,
    // thumbnailStyle,
    headerContentStyle,
    // thumbnailContainerStyle,
    headerAuthorStyle,
    headerDetailStyle
  } = styles;

  return (
    <View style={containerStyle}>
      <View style={headerContentStyle}>
        <Text style={headerAuthorStyle}>{name}</Text>
        <Text style={headerDetailStyle}>{id}</Text>
      </View>
    </View>

  );
};
// <View style={thumbnailContainerStyle}>
// <Image
// style={thumbnailStyle}
// source={{ uri: thumbnail_image }}
// />

const styles = {
  containerStyle: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerAuthorStyle: {
    fontWeight: 'bold',
  },
  headerDetailStyle: {
    fontSize: 11.5,
    fontWeight: '100'
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};

export { CardBanner };
