import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import PostListFriend from '../components/post/PostListFriend';
import ProfileHeaderPublic from '../components/profile/ProfileHeaderPublic';
import { friendRequest, unfriend, fetchFriendList, logout } from '../actions';
import { disabledGray, buttonBlue } from '../assets/colors';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

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
    const user = this.props.navigation.getParam('profileUser');
    const { name, picture } = user;
    const userId = user.uid;

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
                profileUserId={userId}
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
    // paddingTop: 40
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
