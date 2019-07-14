import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PostListMine from '../components/post/PostListMine';
import {
  sendPijn, postsFetch, postEditUpdate, postDelete, showDeleteModal, hideDeleteModal
} from '../actions';

class MyPostsScreen extends Component {
  static navigationOptions = {
    title: 'My Posts',
  };

  render() {
    const redirect = this.props.navigation.navigate;
    const {
      posts,
      postEditUpdate,
      postsFetch,
      postDelete,
      deleteModalVisible,
      showDeleteModal,
      hideDeleteModal,
      postId
    } = this.props;

    return (
      <PostListMine
        posts={posts}
        postEditUpdate={postEditUpdate}
        postsFetch={postsFetch}
        postDelete={postDelete}
        redirect={redirect}
        deleteModalVisible={deleteModalVisible}
        showDeleteModal={showDeleteModal}
        hideDeleteModal={hideDeleteModal}
        postId={postId}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user, postEdit } = state;
  const { deleteModalVisible, postId } = postEdit;
  let posts = _.map(state.posts, (val, uid) => {
    const pijnSentToday = !!state.pijnLog[uid];
    const { navigation } = state;
    return {
      ...val, postId: uid, sendPijn, pijnSentToday, user, navigation
    };
  }).reverse();
  return { posts, deleteModalVisible, postId };
}

export default connect(mapStateToProps, {
  postsFetch, postEditUpdate, postDelete, showDeleteModal, hideDeleteModal
})(MyPostsScreen);
