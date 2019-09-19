import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import PostListPublic from '../components/post/PostListPublic';
import ProfileHeaderPublic from '../components/profile/ProfileHeaderPublic';
import { friendPostsFetch, clearFriend } from '../actions';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    const user = props.navigation.getParam('profileUser');
    const userId = !user.uid ? user.userId : user.uid;
    props.friendPostsFetch(userId);
  }

  componentWillUnmount() {
    this.props.clearFriend();
  }

  renderHeader = (picture, name, userId, status, redirect, navigationTab, friend) => {
    return (
      <ProfileHeaderPublic
        imgSource={{ uri: `${picture}?type=large` }}
        name={name}
        userId={userId}
        status={status}
        redirect={redirect}
        navigationTab={navigationTab}
        friend={friend}
      />
    );
  }

  render() {
    const { navigation, friend, posts } = this.props;
    const { navigate, getParam } = navigation;
    const redirect = navigate;

    const user = getParam('profileUser');
    const navigationTab = getParam('navigationTab');
    const { name, picture } = user;
    // param comes in as user.userId from search and as user.uid from friends
    const userId = !user.uid ? user.userId : user.uid;

    let status = getParam('status');
    if (!status) { status = friend.status; }
    
    return (
      <View style={styles.containerStyle}>
        <View>

            <PostListPublic
              header={this.renderHeader(
                picture, name, userId, status, redirect, navigationTab, user
              )}
              userId={userId}
              posts={posts}
              redirect={redirect}
              status={status}
              navigationTab={navigationTab}
              onProfile
            />

        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  }
};

function mapStateToProps(state) {
  const { friend, user, pijnLog, pinboard } = state;
  let posts = _.map(state.friend.posts, (val, uid) => {
    const pijnSentToday = !!pijnLog[uid];
    const pinned = !!pinboard[uid];
    const { navigation } = state;
    return {
      ...val, postId: uid, pijnSentToday, user, navigation, pinned
    };
  }).reverse();
  return { friend, posts };
}

export default connect(mapStateToProps, {
  clearFriend, friendPostsFetch
})(PublicProfileScreen);
