import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { CommentsScreen } from './CommentsScreen';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Test Screen',
  };


  render() {
    const { getParam } = this.props.navigation;
    const user = getParam('user');
    const postAuthorId = getParam('postAuthorId');
    const postId = getParam('postId');
    const index = getParam('index');

    return (
      <CommentsScreen
        user={user}
        postAuthorId={postAuthorId}
        postId={postId}
        index={index}
      />
    );
  }
}

export default PostScreen;
