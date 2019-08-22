import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';

import ProfileHeaderPersonal from '../components/profile/ProfileHeaderPersonal';
import PostListMine from '../components/post/PostListMine';
import * as actions from '../actions';

class PersonalProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  header() {
    const { currentUser, navigation, fetchFriendList, logout } = this.props;
    const { name, picture, uid } = currentUser;

    return (
      <ProfileHeaderPersonal
        imgSource={{ uri: `${picture}?type=large` }}
        name={name}
        userId={uid}
        navigation={navigation}
        fetchFriendList={fetchFriendList}
        logout={logout}
      />
    );
  }

  renderPersonalPosts() {
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
        header={this.header()}
        navigationTab={'Profile'}
      />
    );
  }

  render() {
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        {this.renderPersonalPosts()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { user, friend, postEdit } = state;
  const { deleteModalVisible, postId } = postEdit;

  const posts = _.map(state.posts, (val, uid) => {
    const pijnSentToday = !!state.pijnLog[uid];
    const { navigation } = state;
    return {
      ...val, postId: uid, pijnSentToday, user, navigation
    };
  }).reverse();

  return ({ currentUser: user, friend, posts, deleteModalVisible, postId });
}

export default connect(mapStateToProps, actions)(PersonalProfileScreen);
