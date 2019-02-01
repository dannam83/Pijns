import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    const user = this.props.navigation.getParam('user');
    const { name, picture, userId } = user;
    const { containerStyle, imageStyle, buttonsViewStyle } = styles;

    return (
      <View style={containerStyle}>
        <Image source={{ uri: `${picture}?type=large` }} style={imageStyle} />
      </View>
    );
  }
}
// <View style={buttonsViewStyle}>
//
// </View>

const styles = {
  containerStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40
  },
  imageStyle: {
    borderRadius: 70,
    height: 140,
    width: 140
  }
};

export default (PublicProfileScreen);
