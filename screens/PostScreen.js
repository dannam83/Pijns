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
    const { userFeedIndex, favoritesIndex, navigation } = this.props;
    const { post } = this;
    return (
      <Post
        post={post}
        navigation={navigation}
        userFeedIndex={userFeedIndex}
        favoritesIndex={favoritesIndex}
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
    favorites: { favoritesMap },
    userFeedTab: { userFeedMap },
  } = state;
  if (!post) { return { postUnavailable }; }
  const { postId } = post;
  const userFeedIndex = userFeedMap[postId];
  const favoritesIndex = favoritesMap[postId];
  const pijnSentToday = !!pijnLog[postId];
  const pinned = !!pinboard[postId];
  const liked = !!postLikes[postId];
  const formattedPost = { ...post, pijnSentToday, pinned, user, navigation, liked };

  return {
    post: formattedPost,
    navigation,
    postUnavailable,
    user,
    userFeedIndex,
    favoritesIndex,
    postId: post.id
  };
}

export default connect(mapStateToProps, {
  commentsPopulate, fetchPostCommentLikes, resetActivePost, confirmPostUnavailable, fetchActivePost
})(PostScreen);
