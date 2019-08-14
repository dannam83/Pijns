import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { InputGrowing } from '../components/common';
import CommentList from '../components/comment/CommentList';
import { commentCreateSave, updateCommentCount } from '../actions';
import { addCommentNotification } from '../api/notifications';


class CommentsScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
  };

  saveComment = ({ user, postAuthorId, postId, index, comment }) => {
    const {
      commentCreateSave, updateCommentCount, addCommentNotification
    } = this.props;

    try {
      commentCreateSave({ user, comment, postAuthorId, postId });
      if (index >= 0) {
        updateCommentCount(index);
      }
      addCommentNotification(user, postId, postAuthorId, comment);
    } catch (err) {
      console.warn('Error saving comment.', err);
    }
  }

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
        <InputGrowing
          user={user}
          postAuthorId={postAuthorId}
          postId={postId}
          navigation={navigation}
          index={index}
          onSave={this.saveComment}
          placeholder="Add a comment..."
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

function mapStateToProps(state) {
  const { commentTyped } = state;
  return { commentTyped, addCommentNotification };
}

export default connect(mapStateToProps, {
  commentCreateSave, updateCommentCount
})(CommentsScreen);
