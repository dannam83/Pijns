import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import PostListFriend from '../components/post/PostListFriend';
import ProfileHeaderPublic from '../components/profile/ProfileHeaderPublic';
import { clearFriend } from '../actions';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  componentWillUnmount() {
    this.props.clearFriend();
  }

  renderHeader = (picture, name, userId, status, redirect, navigationTab) => {
    return (
      <ProfileHeaderPublic
        imgSource={{ uri: `${picture}?type=large` }}
        name={name}
        userId={userId}
        status={status}
        redirect={redirect}
        navigationTab={navigationTab}
      />
    );
  }

  render() {
    const { navigation, friend } = this.props;
    const user = navigation.getParam('profileUser');
    const navigationTab = navigation.getParam('navigationTab');
    const { name, picture } = user;

    // param comes in as user.userId from search and as user.uid from friends
    const userId = !user.uid ? user.userId : user.uid;
    const redirect = navigation.navigate;
    let status = navigation.getParam('status');
    if (!status) { status = friend.status; }
    const { containerStyle } = styles;
    console.log('tab', navigationTab);

    return (
      <View style={containerStyle}>
        <View>
          { status === 'Unfriend' ? (
            <PostListFriend
              header={this.renderHeader(
                picture, name, userId, status, redirect, navigationTab
              )}
              redirect={redirect}
              profileUserId={userId}
              status={status}
            />
          ) : (
            this.renderHeader(picture, name, userId, status, redirect, 'MyProfile')
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
  }
};

function mapStateToProps(state) {
  const { friend } = state;
  return ({ friend });
}

export default connect(mapStateToProps, { clearFriend })(PublicProfileScreen);
