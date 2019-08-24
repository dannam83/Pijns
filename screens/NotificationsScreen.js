import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Request from '../components/notification/Request';
import Notification from '../components/notification/Notification';
import { resetNotificationsCount } from '../api/notifications';
import {
  setFriendStatus,
  acceptFriend,
  declineFriend,
  fetchActivePost,
  fetchPostCommentLikes,
  commentsPopulate
} from '../actions';

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  componentDidMount() {
    this.props.resetNotificationsCount(this.props.currentUser.uid);
  }

  renderRequest = (item) => {
    const { navigation, currentUser, friend } = this.props;
    const { setFriendStatus, acceptFriend, declineFriend } = this.props;

    return (
      <Request
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        friend={friend}
        actions={{ setFriendStatus, acceptFriend, declineFriend }}
      />
    );
  }

  renderNotification = (item) => {
    const { navigation, currentUser } = this.props;
    const { fetchActivePost, fetchPostCommentLikes, commentsPopulate } = this.props;

    return (
      <Notification
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        fetchActivePost={fetchActivePost}
        navigationTab={'Notifications'}
        actions={{ fetchActivePost, fetchPostCommentLikes, commentsPopulate }}
      />
    );
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <FlatList
          data={this.props.requests}
          renderItem={({ item }) => this.renderRequest(item)}
          keyExtractor={({ item }, uid) => uid.toString()}
        />
        <FlatList
          data={this.props.notifications}
          renderItem={({ item }) => this.renderNotification(item)}
          keyExtractor={({ item }, postId) => postId.toString()}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const requests = _.map(state.requests, (val) => {
    return { ...val };
  });

  const notifications = _.map(state.notifications, (val) => {
    return { ...val };
  });
  notifications.sort((a, b) => a.timestamp - b.timestamp);

  const { user, friend } = state;

  return { currentUser: user, friend, requests, notifications, resetNotificationsCount };
}

export default connect(mapStateToProps, {
  setFriendStatus,
  acceptFriend,
  declineFriend,
  fetchActivePost,
  fetchPostCommentLikes,
  commentsPopulate
})(NotificationsScreen);
