import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import CommentList from '../components/comment/CommentList';
import { commentsPopulate, fetchPostCommentLikes, fetchActivePost } from '../actions';

class PostScreen extends Component {
  static navigationOptions = {
    title: 'Post',
  };

  componentDidMount = async () => {
    const { props } = this;
    const { navigation, fetchPostCommentLikes, commentsPopulate, fetchActivePost } = props;
    const user = navigation.getParam('user');
    const postId = navigation.getParam('postId');

    fetchActivePost(postId);
    fetchPostCommentLikes({ userId: user.uid, postId });
    commentsPopulate(postId);
  }

  render() {
    const { getParam } = this.props.navigation;
    const user = getParam('user');
    const postAuthorId = getParam('postAuthorId');
    const postId = getParam('postId');
    const navigationTab = getParam('navigationTab');

    return (
      <View style={{ flex: 1 }}>
        <CommentList
          postAuthorId={postAuthorId}
          postId={postId}
          user={user}
          navigationTab={navigationTab}
        />
      </View>
    );
  }
}

export default connect(null, {
  commentsPopulate, fetchPostCommentLikes, fetchActivePost
})(PostScreen);
