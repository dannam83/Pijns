import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import CommentInput from '../components/comment/CommentInput';

class PostCommentsScreen extends Component {
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
    padding: 10,
  }
};

export default PostCommentsScreen;
