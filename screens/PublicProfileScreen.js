import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import PostListPublic from '../components/post/PostListPublic';
import ProfileHeaderPublic from '../components/profile/ProfileHeaderPublic';
import {
  friendPostsFetch, clearFriend, friendStatusSilence, getFriendStatus,
} from '../actions';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    const profileUser = props.navigation.getParam('profileUser');

    // param comes in as user.userId from search and as user.uid from friends
    const profileId = !profileUser.uid ? profileUser.userId : profileUser.uid;

    this.profileUser = profileUser;
    this.profileId = profileId;
    this.friendStatus = null;
    props.friendPostsFetch(profileId);
  }

  shouldComponentUpdate(newProps) {
    const { friendId } = newProps.friend;
    if (!friendId) {
      const { profileId } = this;
      const { uid: currentUserId } = newProps.user;
      newProps.getFriendStatus({ profileUserId: profileId, currentUserId });
      newProps.friendPostsFetch(profileId);
    }
    return this.profileId === friendId;
  }

  componentWillUnmount() {
    const { profileId: profileUserId, props: { user: { uid } } } = this;
    this.props.friendStatusSilence({ profileUserId, currentUserId: uid });
    this.props.clearFriend();
  }

  renderHeader = (picture, name, userId, redirect, friend) => {
    return (
      <ProfileHeaderPublic
        imgSource={{ uri: `${picture}?type=large` }}
        name={name}
        redirect={redirect}
        friend={friend}
        profileId={this.profileId}
      />
    );
  }

  render() {
    const { navigation, posts, friend, user: { uid: userId } } = this.props;
    const { navigate } = navigation;
    const redirect = navigate;

    let status = navigation.getParam('status');
    if (!status) { status = friend.status; }
    if (status !== 'pending') { this.friendStatus = status; }

    const {
      profileId, profileUser, friendStatus,
      profileUser: { name, picture }
    } = this;


    return (
      <View style={styles.containerStyle}>
        <View>
          <PostListPublic
            header={this.renderHeader(
              picture, name, profileId, redirect, profileUser
            )}
            userId={userId}
            posts={this.profileId !== friend.friendId ? null : posts}
            redirect={redirect}
            status={friendStatus}
            onProfile
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  }
});

function mapStateToProps(state) {
  const { friend, user, pijnLog, pinboard, postLikes,
    favorites: { favoritesIds, favoritesMap },
  } = state;
  let posts = _.map(state.friend.posts, (val, uid) => {
    const pijnSentToday = !!pijnLog[uid];
    const pinned = !!pinboard[uid];
    const liked = !!postLikes[uid];
    const favorite = !!favoritesIds[uid];
    const favoritesIndex = favoritesMap[uid];
    const { navigation } = state;
    return {
      ...val,
      postId: uid,
      pijnSentToday,
      user,
      navigation,
      pinned,
      liked,
      favorite,
      favoritesIndex,
    };
  }).reverse();
  return { friend, posts, user, status: friend.status };
}

export default connect(mapStateToProps, {
  clearFriend, friendPostsFetch, friendStatusSilence, getFriendStatus
})(PublicProfileScreen);
