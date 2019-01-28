import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import CommentInput from '../components/comment/CommentInput';
import CommentList from '../components/comment/CommentList';

class CommentsScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
  };

  render() {
    const user = this.props.navigation.getParam('user');
    const postAuthorId = this.props.navigation.getParam('postAuthorId');
    const postId = this.props.navigation.getParam('postId');
    const navigation = this.props.navigation;

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
          author={user}
        />
        <CommentInput
          user={user}
          postAuthorId={postAuthorId}
          postId={postId}
          navigation={navigation}
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
    // paddingTop: 10,
    paddingBottom: 10
  }
};

export default (CommentsScreen);
