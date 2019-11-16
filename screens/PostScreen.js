import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentList from '../components/comment/CommentList';
import Post from '../components/post/Post';
import { Confirm } from '../components/common';
import {
  commentsPopulate,
  fetchPostCommentLikes,
  resetActivePost,
  confirmPostUnavailable,
  fetchActivePost
} from '../actions';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Post',
  };

  constructor(props) {
    super(props);
    const { navigation, postId, user } = this.props;
    this.postId = navigation.getParam('postId') || postId;
    this.user = navigation.getParam('user') || user;
    this.post = null;
  }

  componentDidMount() {
    const { postId, user } = this;

    this.props.fetchActivePost(postId);
    this.props.fetchPostCommentLikes({ userId: user.uid, postId });
    this.props.commentsPopulate(postId);
  }

  shouldComponentUpdate() {
    if (this.props.postId || this.props.navigation.getParam('postId')) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.props.resetActivePost(this.postId);
  }

  onAccept = () => {
    this.props.confirmPostUnavailable();
    this.props.navigation.goBack();
  }

  header = () => {
    const { userFeedIndex, navigation } = this.props;
    const { post } = this;
    return (
      <Post
        post={post}
        navigation={navigation}
        navigationTab={'Notifications'}
        userFeedIndex={userFeedIndex}
        likes={post.likes}
        notes={post.notes.count}
      />
    );
  }

  render() {
    const { post, postUnavailable } = this.props;

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

    if (!this.post) { this.post = post; }

    return (
      <CommentList
        header={this.header}
        navigationTab={'Notifications'}
        userId={this.user.uid}
        postId={this.postId}
      />
    );
  }
}

function mapStateToProps(state) {
  const {
    user, pijnLog, pinboard, navigation, postLikes,
    activePost: { post },
    modals: { postUnavailable },
    userFeedTab: { userFeedMap },
  } = state;
  if (!post) { return { postUnavailable }; }

  const userFeedIndex = userFeedMap[post.postId];
  const pijnSentToday = !!pijnLog[post.postId];
  const pinned = !!pinboard[post.postId];
  const liked = !!postLikes[post.postId];
  const formattedPost = { ...post, pijnSentToday, pinned, user, navigation, liked };

  return {
    post: formattedPost, navigation, postUnavailable, user, userFeedIndex, postId: post.id
  };
}

export default connect(mapStateToProps, {
  commentsPopulate, fetchPostCommentLikes, resetActivePost, confirmPostUnavailable, fetchActivePost
})(PostScreen);
