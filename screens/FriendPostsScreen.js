import React, { Component } from 'react';

import PostListFriends from '../components/post/PostListFriends';

class FriendPostsScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
    headerTitleStyle: {
      color: '#03A9F4',
      fontFamily: 'coiny',
      fontSize: 20,
    },
  };

  render() {
    const redirect = this.props.navigation.navigate;

    return (
      <PostListFriends redirect={redirect} />
    );
  }
}

export default (FriendPostsScreen);
