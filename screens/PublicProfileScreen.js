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
    const { navigate, getParam } = navigation;
    const redirect = navigate;

    const user = getParam('profileUser');
    const navigationTab = getParam('navigationTab');

    const { name, picture } = user;
    // param comes in as user.userId from search and as user.uid from friends
    const userId = !user.uid ? user.userId : user.uid;

    let status = getParam('status');
    if (!status) { status = friend.status; }

    return (
      <View style={styles.containerStyle}>
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
            this.renderHeader(picture, name, userId, status, redirect, navigationTab)
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
