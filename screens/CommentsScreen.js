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
  resetActivePost,
} from '../actions';

class CommentsScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
  };

  constructor(props) {
    super(props);
    const { user, postId, navigation } = this.props;
    this.user = user || navigation.getParam('user');
    this.postId = postId || navigation.getParam('postId');
  }

  componentDidMount = async () => {
    const {
      user, postId,
      props: { fetchPostCommentLikes, commentsPopulate, fetchActivePost },
    } = this;

    await fetchPostCommentLikes({ userId: user.uid, postId });
    await commentsPopulate(postId);
    await fetchActivePost(postId);
  }

  componentWillUnmount() {
    this.props.commentsClear();
    this.props.resetActivePost(this.postId);
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
    const postAuthorId = props.postAuthorId || navigation.getParam('postAuthorId');
    const index = props.index || navigation.getParam('index');
    const { user, postId, saveComment } = this;

    return (
      <View style={styles.containerStyle}>
        <CommentList
          postId={postId}
        />
        <InputGrowing
          user={user}
          postAuthorId={postAuthorId}
          postId={postId}
          navigation={navigation}
          index={index}
          onSave={saveComment}
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
  resetActivePost,
})(CommentsScreen);
