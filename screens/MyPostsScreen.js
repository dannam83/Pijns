import React, { Component } from 'react';

import PostListMine from '../components/post/PostListMine';

class MyPostsScreen extends Component {
  static navigationOptions = {
    title: 'My Posts',
  };

  render() {
    const redirect = this.props.navigation.navigate;

    return (
      <PostListMine redirect={redirect} />
    );
  }
}

export default MyPostsScreen;
