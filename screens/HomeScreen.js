import React, { Component } from 'react';

import PostList from '../components/post/PostList';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
  };

  render() {
    const redirect = this.props.navigation.navigate;

    return (
      <PostList redirect={redirect} />
    );
  }
}

export default HomeScreen;
