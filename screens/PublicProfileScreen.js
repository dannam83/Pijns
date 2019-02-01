import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { Button } from '../components/common';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    const user = this.props.navigation.getParam('user');
    const { name, picture, userId } = user;
    const { containerStyle, imageStyle, nameStyle, buttonsViewStyle } = styles;

    return (
      <View style={containerStyle}>
        <Image source={{ uri: `${picture}?type=large` }} style={imageStyle} />
        <Text style={nameStyle}>{name}</Text>
        <View style={buttonsViewStyle}>
          <Button>Follow</Button>
          <Button>Message</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingTop: 40
  },
  imageStyle: {
    borderRadius: 70,
    height: 140,
    width: 140,
    marginBottom: 20
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 35
  },
  buttonsViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
};

export default (PublicProfileScreen);
