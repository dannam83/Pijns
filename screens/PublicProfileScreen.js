import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import PostListFriend from '../components/post/PostListFriend';
import ProfileHeaderPublic from '../components/profile/ProfileHeaderPublic';
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

  renderHeader(picture, name, userId, status, tab, redirect) {
    return (
      <ProfileHeaderPublic
        imgSource={{ uri: `${picture}?type=large` }}
        name={name}
        userId={userId}
        status={status}
        tab={tab}
        redirect={redirect}
      />
    );
  }

  render() {
    let user = this.props.navigation.getParam('profileUser');
    user = !user ? this.props.currentUser : user;

    let { name, picture, userId } = user;
    userId = !userId ? user.uid : userId;

    const {
      containerStyle
    } = styles;

    const { status } = this.props.friend;
    const redirect = this.props.navigation.navigate;
    const tab = this.props.navigation.getParam('tab');

    return (
      <View style={containerStyle}>
          <View>
            { status === 'Unfriend' ? (
              <PostListFriend
                header={this.renderHeader(picture, name, userId, status, tab, redirect)}
                redirect={redirect}
                tab={'Friends'}
              />
            ) : (
              this.renderHeader(picture, name, userId, status, tab, redirect)
            )}
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
  },
};

function mapStateToProps(state) {
  const { user, friend } = state;
  return ({ currentUser: user, friend });
}

export default connect(mapStateToProps, {
  friendRequest, unfriend, fetchFriendList, logout
})(PublicProfileScreen);
