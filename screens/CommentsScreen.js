import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { InputGrowing } from '../components/common';
import CommentList from '../components/comment/CommentList';
import { sendCommentNotification } from '../api/notifications_api';
import {
  commentCreateSave,
  commentsPopulate,
  fetchPostCommentLikes,
  fetchActivePost,
  commentsClear,
  updateUserFeed,
} from '../actions';

class CommentsScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
  };

  componentDidMount = async () => {
    const { props } = this;
    const { navigation, fetchPostCommentLikes, commentsPopulate, fetchActivePost } = props;
    const user = props.user || navigation.getParam('user');
    const postId = props.postId || navigation.getParam('postId');
    const navigationTab = props.navigationTab || navigation.getParam('navigationTab');

    if (navigationTab !== 'Notifications') {
      await fetchPostCommentLikes({ userId: user.uid, postId });
      await commentsPopulate(postId);
      await fetchActivePost(postId);
    }
  }

  shouldComponentUpdate() {
    console.log('should update', this.props.navigation.getParam('postId'));
    return true;
  }

  componentWillUnmount() {
    if (this.props.keepComments) { return; }

    this.props.commentsClear();
  }

  saveComment = ({ user, postAuthorId, postId, comment }) => {
    const {
      commentCreateSave,
      updateUserFeed,
      sendCommentNotification,
      commentCount,
      userFeedMap,
    } = this.props;

    const userFeedIndex = userFeedMap[postId];

    try {
      commentCreateSave({ user, comment, postAuthorId, postId });
      updateUserFeed(userFeedIndex, 'commentCount', commentCount + 1);
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
          postId={postId}
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
  const { commentTyped, comments, userFeedTab: { userFeedMap } } = state;
  const commentCount = comments ? Object.keys(comments).length : 0;
  return { commentTyped, sendCommentNotification, commentCount, userFeedMap };
}

export default connect(mapStateToProps, {
  commentCreateSave,
  commentsPopulate,
  fetchPostCommentLikes,
  fetchActivePost,
  commentsClear,
  updateUserFeed,
})(CommentsScreen);
