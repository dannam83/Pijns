import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../components/common';
import { friendRequest } from '../actions';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  onFriendPress = (profileUserId) => {
    const currentUserId = this.props.currentUser.uid;
    this.props.friendRequest({ profileUserId, currentUserId });
  }

  render() {
    const user = this.props.navigation.getParam('user');
    const { name, picture, userId } = user;
    const { containerStyle, imageStyle, nameStyle, buttonsViewStyle } = styles;

    return (
      <View style={containerStyle}>
        <Image source={{ uri: `${picture}?type=large` }} style={imageStyle} />
        <Text style={nameStyle}>{name}</Text>
        <View style={buttonsViewStyle}>
          <Button onPress={() => this.onFriendPress(userId)}>Add Friend</Button>
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

function mapStateToProps(state) {
  return ({ currentUser: state.user });
}

export default connect(mapStateToProps, { friendRequest })(PublicProfileScreen);
