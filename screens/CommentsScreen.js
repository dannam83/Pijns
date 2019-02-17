import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import CommentInput from '../components/comment/CommentInput';
import CommentList from '../components/comment/CommentList';

class CommentsScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
  };

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const postAuthorId = navigation.getParam('postAuthorId');
    const postId = navigation.getParam('postId');
    const index = navigation.getParam('index');

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidStyle}
        behavior="padding"
        enabled
        keyboardVerticalOffset={80}
      >
        <CommentList
          postAuthorId={postAuthorId}
          postId={postId}
          user={user}
        />
        <CommentInput
          user={user}
          postAuthorId={postAuthorId}
          postId={postId}
          navigation={navigation}
          index={index}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  keyboardAvoidStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  }
};

export default (CommentsScreen);
