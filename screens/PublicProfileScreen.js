import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../components/common';
import { friendRequest, unfriend, fetchFriendList } from '../actions';
import { disabledGray, buttonBlue } from '../assets/colors';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  onFriendsPress = (userId) => {
    this.props.fetchFriendList(userId);
    const nav = this.props.navigation;
    const tab = nav.getParam('tab');

    if (tab === 'Friends') {
      nav.navigate('FR_Friends', { tab });
    } else {
      nav.navigate('Friends');
    }
  }

  buttonStyle(status) {
    const { buttonBorderGray, buttonBodyBlue } = styles;

    switch (status) {
      case 'Requested': return buttonBorderGray;
      case 'See Requests': return buttonBodyBlue;
      case 'Unfriend': return buttonBorderGray;
      default: return {};
    }
  }

  buttonTextStyle(status) {
    const { buttonTextGray, buttonTextWhite } = styles;

    switch (status) {
      case 'Requested': return buttonTextGray;
      case 'See Requests': return buttonTextWhite;
      case 'Unfriend': return buttonTextGray;
      default: return {};
    }
  }

  disableButton(status) {
    if (status === 'Requested') {
      return true;
    }
  }

  render() {
    let user = this.props.navigation.getParam('profileUser');
    user = !user ? this.props.currentUser : user;

    let { name, picture, userId } = user;
    userId = !userId ? user.uid : userId;

    const {
      containerStyle, imageStyle, nameStyle, buttonsViewStyle
    } = styles;

    const { status } = this.props.friend;

    return (
      <View style={containerStyle}>
        <Image source={{ uri: `${picture}?type=large` }} style={imageStyle} />
        <Text style={nameStyle}>{name}</Text>
        <View style={buttonsViewStyle}>
          { userId === this.props.currentUser.uid ? (
            <Button
              onPress={() => this.onFriendsPress(userId)}
            >Friends</Button>
          ) : (
            <Button
              onPress={() => this.onFriendPress(userId, status)}
              buttonRestyle={this.buttonStyle(status)}
              textRestyle={this.buttonTextStyle(status)}
              disabled={this.disableButton(status)}
            >{ !status ? 'Add Friend' : status }</Button>
          )}
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
  },
  buttonBorderGray: {
    borderColor: disabledGray
  },
  buttonTextGray: {
    color: disabledGray
  },
  buttonBodyBlue: {
    borderColor: buttonBlue,
    backgroundColor: buttonBlue
  },
  buttonTextWhite: {
    color: 'white'
  },
};

function mapStateToProps(state) {
  const { user, friend } = state;
  return ({ currentUser: user, friend });
}

export default connect(mapStateToProps, {
  friendRequest, unfriend, fetchFriendList
})(PublicProfileScreen);
