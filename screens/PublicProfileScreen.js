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

  renderHeader = (picture, name, userId, status, redirect) => {
    return (
      <ProfileHeaderPublic
        imgSource={{ uri: `${picture}?type=large` }}
        name={name}
        userId={userId}
        status={status}
        redirect={redirect}
      />
    );
  }

  render() {
    const user = this.props.navigation.getParam('profileUser');
    const { name, picture } = user;

    // param comes in as user.userId from search and as user.uid from friends
    const userId = !user.uid ? user.userId : user.uid;
    const redirect = this.props.navigation.navigate;
    let status = this.props.navigation.getParam('status');
    if (!status) { status = this.props.friend.status; }
    const { containerStyle } = styles;

    return (
      <View style={containerStyle}>
        <View>
          { status === 'Unfriend' ? (
            <PostListFriend
              header={this.renderHeader(picture, name, userId, status, redirect)}
              redirect={redirect}
              profileUserId={userId}
              status={status}
            />
          ) : (
            this.renderHeader(picture, name, userId, status, redirect)
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
