import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentList from '../components/comment/CommentList';
import Post from '../components/post/Post';
import { Confirm } from '../components/common';
import {
  commentsPopulate,
  fetchPostCommentLikes,
  resetActivePost,
  confirmPostUnavailable
} from '../actions';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Post',
  };

  componentWillUnmount() {
    if (this.props.post) {
      this.props.resetActivePost(this.props.post.postId);
    }
  }

  onAccept = () => {
    this.props.confirmPostUnavailable();
    this.props.navigation.goBack();
  }

  header(post, redirect) {
    return (
      <Post
        post={post}
        redirect={redirect}
        navigationTab={'Notifications'}
      />
    );
  }

  render() {
    const { user, post, navigation, postUnavailable } = this.props;

    if (!post) {
      return (
        <Confirm
          visible={postUnavailable}
          onAccept={this.onAccept}
          acceptText={'Ok'}
        >
          Sorry! It looks like this post isn't available anymore.
        </Confirm>
      );
    }

    return (
      <CommentList
        header={() => this.header(post, navigation.navigate)}
        navigationTab={'Notifications'}
        userId={user.uid}
        postId={post.postId}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user, pijnLog, pinboard, activePost, navigation, modals } = state;
  const { post } = activePost;
  const { postUnavailable } = modals;
  if (!post) { return { postUnavailable }; }

  const pijnSentToday = !!pijnLog[post.postId];
  const pinned = !!pinboard[post.postId];
  const formattedPost = { ...post, pijnSentToday, pinned, user, navigation };

  return { post: formattedPost, navigation, postUnavailable, user };
}

export default connect(mapStateToProps, {
  commentsPopulate, fetchPostCommentLikes, resetActivePost, confirmPostUnavailable
})(PostScreen);
