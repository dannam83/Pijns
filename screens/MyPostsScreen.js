import React, { Component } from 'react';

import PostList from '../components/post/PostList';

class MyPostsScreen extends Component {
  static navigationOptions = {
    title: 'My Posts',
  };

  render() {
    const redirect = this.props.navigation.navigate;

    return (
      <PostList redirect={redirect} />
    );
  }
}

export default MyPostsScreen;
