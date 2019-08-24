import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import CommentList from '../components/comment/CommentList';
import Post from '../components/post/Post';
import { backgroundLightBlue } from '../assets/colors';
import {
  commentsPopulate,
  fetchPostCommentLikes,
} from '../actions';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Post',
  };

  render() {
    if (!this.props.post) { return null; }
    const { outerViewStyle, commentListViewStyle } = styles;

    return (
      <View style={outerViewStyle}>
        <Post
          post={this.props.post}
          redirect={this.props.navigation.navigate}
          navigationTab={'Notifications'}
        />
        <View style={commentListViewStyle}>
          <CommentList
            navigationTab={'Notifications'}
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
  const formattedPost = { ...post, pijnSentToday, pinned, user, navigation };

  return { post: formattedPost, navigation };
}

export default connect(mapStateToProps, { commentsPopulate, fetchPostCommentLikes })(PostScreen);
