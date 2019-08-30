import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import FriendRequest from '../components/notification/FriendRequest';
import Notification from '../components/notification/Notification';
import { resetNotificationsCount } from '../api/notifications_api';
import {
  setFriendStatus,
  acceptFriend,
  declineFriend,
} from '../actions';

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  renderRequest = (item) => {
    const { navigation, currentUser, friend } = this.props;
    const { setFriendStatus, acceptFriend, declineFriend } = this.props;

    return (
      <FriendRequest
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        friend={friend}
        actions={{ setFriendStatus, acceptFriend, declineFriend }}
      />
    );
  }

  renderNotification = (item) => {
    const { navigation, currentUser, friend } = this.props;
    const { setFriendStatus, acceptFriend, declineFriend } = this.props;
    const { type, id, uid } = item;

    if (!id && !uid) { return null; }

    return (!type || type === 'FriendRequest') ? (
      <FriendRequest
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        friend={friend}
        actions={{ setFriendStatus, acceptFriend, declineFriend }}
      />
    ) : (
      <Notification
        item={item}
        navigation={navigation}
        currentUser={currentUser}
        navigationTab={'Notifications'}
      />
    );
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
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

  const otherNotifications = _.map(state.notifications, (val) => {
    return { ...val };
  }).sort((a, b) => a.timestamp - b.timestamp);

  const notifications = [...requests, ...otherNotifications];

  const { user, friend } = state;

  return { currentUser: user, friend, notifications, resetNotificationsCount };
}

export default connect(mapStateToProps, {
  setFriendStatus,
  acceptFriend,
  declineFriend,
})(NotificationsScreen);
