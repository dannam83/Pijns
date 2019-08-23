import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import CommentList from '../components/comment/CommentList';
import ListItem from '../components/post/ListItem';
import { commentsPopulate, fetchPostCommentLikes, fetchActivePost } from '../actions';
import { backgroundLightBlue } from '../assets/colors';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Post',
  };

  componentDidMount() {
    const {
      navigation, fetchPostCommentLikes, commentsPopulate, fetchActivePost
    } = this.props;
    const user = navigation.getParam('user');
    const postId = navigation.getParam('postId');

    fetchActivePost(postId);
    fetchPostCommentLikes({ userId: user.uid, postId });
    commentsPopulate(postId);
  }

  render() {
    if (!this.props.post) { return null; }

    const { getParam, navigate } = this.props.navigation;
    const user = getParam('user');
    const postAuthorId = getParam('postAuthorId');
    const postId = getParam('postId');
    const navigationTab = getParam('navigationTab');
    const { outerViewStyle, containerRestyle, commentListViewStyle } = styles;

    return (
      <View style={outerViewStyle}>
        <ListItem
          post={this.props.post}
          redirect={navigate}
          navigationTab={navigationTab}
          containerRestyle={containerRestyle}
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
  containerRestyle: {
    marginTop: 0,
    marginBottom: 2
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
