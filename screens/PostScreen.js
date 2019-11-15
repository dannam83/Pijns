import React, { PureComponent } from 'react';
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

class PostScreen extends PureComponent {
  static navigationOptions = {
    title: 'Post',
  };

  constructor(props) {
    super(props);
    const postId = this.props.navigation.getParam('postId') || this.props.postId;
    const user = this.props.navigation.getParam('user') || this.props.user;
    this.state = { postId, user };
  }

  componentDidMount() {
    const { postId, user } = this.state;

    this.props.fetchActivePost(postId);
    this.props.fetchPostCommentLikes({ userId: user.uid, postId });
    this.props.commentsPopulate(postId);
  }

  componentWillUnmount() {
    this.props.resetActivePost(this.state.postId);
  }

  onAccept = () => {
    this.props.confirmPostUnavailable();
    this.props.navigation.goBack();
  }

  header = () => {
    const { post, userFeedIndex, navigation: { navigate } } = this.props;
    return (
      <Post
        post={post}
        redirect={navigate}
        navigationTab={'Notifications'}
        userFeedIndex={userFeedIndex}
        likes={post.likes}
        notes={post.notes.count}
      />
    );
  }

  render() {
    const { user, post, postUnavailable } = this.props;

    if (!post || postUnavailable) {
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
        header={this.header}
        navigationTab={'Notifications'}
        userId={user.uid}
        postId={post.postId}
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
