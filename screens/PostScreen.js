import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CommentsScreen from './CommentsScreen';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Post',
  };


  render() {
    const { getParam } = this.props.navigation;
    const user = getParam('user');
    const postAuthorId = getParam('postAuthorId');
    const postId = getParam('postId');
    const author = getParam('author');

    return (
      <CommentsScreen
        user={user}
        postAuthorId={postAuthorId}
        postId={postId}
        author={author}
        navigation={this.props.navigation}
      />
    );
  }
}

export default PostScreen;
