import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../components/common';
import { friendRequest, unfriend, fetchFriendList, logout } from '../actions';
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
    } else if (tab === 'My') {
      nav.navigate('MY_Friends', { tab });
    } else {
      nav.navigate('Friends');
    }
  }

  onFriendPress = (profileUserId, status) => {
    const { currentUser } = this.props;
    if (!status) {
      this.props.friendRequest({ profileUserId, currentUser });
    } else if (status === 'See Requests') {
      this.props.navigation.navigate('Notifications');
    } else if (status === 'Unfriend') {
      this.props.unfriend({ profileUserId, currentUser });
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

  goToChat = async (userId) => {
    const { currentUser, navigation } = this.props;

    navigation.navigate('ProfileChat', {
      user: currentUser, postAuthorId: userId
    });
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


          { userId === this.props.currentUser.uid ? (
            <View style={buttonsViewStyle}>
              <Button
                onPress={() => this.onFriendsPress(userId)}
              >Friends
              </Button>
              <Button
                onPress={() => this.props.logout()}
              >Logout
              </Button>
            </View>
          ) : (
            <View style={buttonsViewStyle}>
              <Button
                onPress={() => this.onFriendPress(userId, status)}
                buttonRestyle={this.buttonStyle(status)}
                textRestyle={this.buttonTextStyle(status)}
                disabled={this.disableButton(status)}
              >{ !status ? 'Add Friend' : status }
              </Button>
              <Button
                onPress={() => this.goToChat(userId)}
              >Message
              </Button>
            </View>
          )}
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
  friendRequest, unfriend, fetchFriendList, logout
})(PublicProfileScreen);
