import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { InputGrowing } from '../components/common';
import CommentList from '../components/comment/CommentList';
import { sendCommentNotification } from '../api/notifications_api';
import {
  commentCreateSave,
  updateCommentCount,
  commentsPopulate,
  fetchPostCommentLikes,
  setActivePost,
  commentsClear
} from '../actions';


class CommentsScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
  };

  componentDidMount() {
    const { props } = this;
    const { navigation, fetchPostCommentLikes, commentsPopulate, setActivePost } = props;
    const user = props.user || navigation.getParam('user');
    const postId = props.postId || navigation.getParam('postId');
    const author = props.author || navigation.getParam('author');
    const navigationTab = props.navigationTab || navigation.getParam('navigationTab');

    if (navigationTab !== 'Notifications') {
      fetchPostCommentLikes({ userId: user.uid, postId });
      commentsPopulate(postId);
      setActivePost({ postId, postAuthor: author });
    }
  }

  componentWillUnmount() {
    if (this.props.keepComments) { return; }

    this.props.commentsClear();
  }

  saveComment = ({ user, postAuthorId, postId, index, comment }) => {
    const {
      commentCreateSave, updateCommentCount, sendCommentNotification
    } = this.props;

    try {
      commentCreateSave({ user, comment, postAuthorId, postId });
      if (index >= 0) {
        updateCommentCount(index);
      }
      sendCommentNotification(user, postId, postAuthorId, comment);
    } catch (err) {
      console.warn('Error saving comment.', err);
    }
  }

  render() {
    const [props, navigation] = [this.props, this.props.navigation];
    const user = props.user || navigation.getParam('user');
    const postAuthorId = props.postAuthorId || navigation.getParam('postAuthorId');
    const postId = props.postId || navigation.getParam('postId');
    const index = props.index || navigation.getParam('index');
    const navigationTab = props.index || navigation.getParam('navigationTab');
    const keepComments = props.keepComments || navigation.getParam('keepComments');

    return (
      <View style={styles.containerStyle}>
        <CommentList
          navigationTab={navigationTab}
          keepComments={keepComments}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 5
  }
});

function mapStateToProps(state) {
  const { commentTyped } = state;
  return { commentTyped, sendCommentNotification };
}

export default connect(mapStateToProps, {
  commentCreateSave,
  updateCommentCount,
  commentsPopulate,
  fetchPostCommentLikes,
  setActivePost,
  commentsClear
})(CommentsScreen);
