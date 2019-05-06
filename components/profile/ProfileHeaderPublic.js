import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../../components/common';
import { friendRequest, unfriend, fetchFriendList } from '../../actions';
import { disabledGray, buttonBlue } from '../../assets/colors';

class ProfileHeaderPersonal extends Component {
  onFriendsPress = (userId, tab, redirect) => {
    this.props.fetchFriendList(userId);

    if (tab === 'Friends') {
      redirect('FR_Friends', { tab });
    } else if (tab === 'My') {
      redirect('MY_Friends', { tab });
    } else {
      redirect('Friends');
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
    const { imgSource, name, userId, tab, redirect, logout } = this.props;

    const {
      containerStyle, imageStyle, nameStyle, buttonsViewStyle
    } = styles;

    const { status } = this.props.friend;

    return (
      <View style={containerStyle}>
        <Image source={imgSource} style={imageStyle} />
        <Text style={nameStyle}>{name}</Text>

          { userId === this.props.currentUser.uid ? (
            <View style={buttonsViewStyle}>
              <Button
                onPress={() => this.onFriendsPress(userId, tab, redirect)}
              >Friends
              </Button>

              <Button
                onPress={() => logout(redirect)}
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
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
  }
};

function mapStateToProps(state) {
  const { user, friend } = state;
  return ({ currentUser: user, friend });
}

export default connect(mapStateToProps, {
  friendRequest, unfriend, fetchFriendList
})(ProfileHeaderPersonal);
