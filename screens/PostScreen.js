import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import CommentList from '../components/comment/CommentList';
import Post from '../components/post/Post';
import { backgroundLightBlue } from '../assets/colors';
import {
  commentsPopulate, fetchPostCommentLikes, fetchActivePost, detachActivePost
} from '../actions';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Post',
  };

  state = {
    user: this.props.navigation.getParam('user'),
    postId: this.props.navigation.getParam('postId'),
    postAuthorId: this.props.navigation.getParam('postAuthorId'),
    navigationTab: this.props.navigation.getParam('navigationTab'),
  }

  componentDidMount() {
    const { fetchPostCommentLikes, commentsPopulate, fetchActivePost } = this.props;
    const { user, postId } = this.state;

    fetchActivePost(postId);
    fetchPostCommentLikes({ userId: user.uid, postId });
    commentsPopulate(postId);
  }

  componentWillUnmount() {
    detachActivePost(this.state.postId);
  }

  render() {
    if (!this.props.post) { return null; }
    const { user, postId, postAuthorId, navigationTab } = this.state;
    const { navigate } = this.props.navigation;
    const { outerViewStyle, commentListViewStyle } = styles;

    return (
      <View style={outerViewStyle}>
        <Post
          post={this.props.post}
          redirect={navigate}
          navigationTab={navigationTab}
        />
        <View style={commentListViewStyle}>
          <CommentList
            postAuthorId={postAuthorId}
            postId={postId}
            user={user}
            navigationTab={navigationTab}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  outerViewStyle: {
    flex: 1,
    backgroundColor: backgroundLightBlue
  },
  commentListViewStyle: {
    flex: 1
  }
};

function mapStateToProps(state) {
  const { user, pijnLog, pinboard, activePost, navigation } = state;
  const { post } = activePost;
  if (!post) { return {}; }

  const pijnSentToday = !!pijnLog[post.postId];
  const pinned = !!pinboard[post.postId];
  const formattedPost = { ...post, pijnSentToday, pinned, user, navigation, };

  return { post: formattedPost };
}

export default connect(mapStateToProps, {
  commentsPopulate, fetchPostCommentLikes, fetchActivePost
})(PostScreen);
