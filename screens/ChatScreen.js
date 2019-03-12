import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { InputGrowing } from '../components/common';
import CommentList from '../components/comment/CommentList';
import { commentCreateSave, updateCommentCount } from '../actions';


class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat',
  };

  saveChat = ({ user, postAuthorId, postId, index, comment }) => {
    try {
      this.props.commentCreateSave({ user, comment, postAuthorId, postId });
      if (index >= 0) {
        this.props.updateCommentCount(index);
      }
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
          onSave={this.saveChat}
          placeholder="Say something..."
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
  return { commentTyped };
}

export default connect(mapStateToProps, {
  commentCreateSave, updateCommentCount
})(ChatScreen);
