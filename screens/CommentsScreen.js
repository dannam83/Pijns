import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import CommentInput from '../components/comment/CommentInput';
import CommentList from '../components/comment/CommentList';
import { commentsPopulate } from '../actions';

class CommentsScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
  };

  constructor(props) {
    super(props);
    props.commentsPopulate(this.props.navigation.getParam('comments'));
  }

  render() {
    const user = this.props.navigation.getParam('user');
    const postAuthorId = this.props.navigation.getParam('postAuthorId');
    const postId = this.props.navigation.getParam('postId');
    const comments = this.props.navigation.getParam('comments');
    const navigation = this.props.navigation;

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidStyle}
        behavior="padding"
        enabled
        keyboardVerticalOffset={80}
      >
        <CommentList
          comments={comments}
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
    padding: 10,
  }
};

export default connect(null, { commentsPopulate })(CommentsScreen);
