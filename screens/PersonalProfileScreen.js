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
    const redirect = this.props.navigation.push;
    const {
      posts,
      postEditUpdate,
      postsFetch,
      postDelete,
      deleteModalVisible,
      showDeleteModal,
      hideDeleteModal,
      postId,
      userFeedMap,
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
        userFeedMap={userFeedMap}
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
  const {
    user, friend, pijnLog, postLikes,
    userFeedTab: { userFeedMap },
    postEdit: { deleteModalVisible, postId },
    favorites: { favoritesMap },
  } = state;

  const posts = _.map(state.posts, (val, uid) => {
    const pijnSentToday = !!pijnLog[uid];
    const liked = !!postLikes[uid];
    const favoritesIndex = favoritesMap[uid];
    const { navigation } = state;
    return {
      ...val, postId: uid, pijnSentToday, user, navigation, liked, favoritesIndex,
    };
  }).reverse();

  return ({
    currentUser: user, friend, posts, deleteModalVisible, postId, userFeedMap,
  });
}

export default connect(mapStateToProps, actions)(PersonalProfileScreen);
