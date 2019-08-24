import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentList from '../components/comment/CommentList';
import Post from '../components/post/Post';
import {
  commentsPopulate,
  fetchPostCommentLikes,
  resetActivePost
} from '../actions';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Post',
  };

  componentWillUnmount() {
    this.props.resetActivePost(this.props.post.postId);
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
    if (!this.props.post) { return null; }
    const { post, navigation } = this.props;

    return (
      <CommentList
        header={() => this.header(post, navigation.navigate)}
        navigationTab={'Notifications'}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user, pijnLog, pinboard, activePost, navigation } = state;
  const { post } = activePost;
  if (!post) { return {}; }

  const pijnSentToday = !!pijnLog[post.postId];
  const pinned = !!pinboard[post.postId];
  const formattedPost = { ...post, pijnSentToday, pinned, user, navigation };

  return { post: formattedPost, navigation };
}

export default connect(mapStateToProps, {
  commentsPopulate, fetchPostCommentLikes, resetActivePost
})(PostScreen);
