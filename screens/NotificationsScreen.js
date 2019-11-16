import React, { Component } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import FriendRequest from '../components/notification/FriendRequest';
import Notification from '../components/notification/Notification';
import { resetNotificationsCount } from '../api/notifications_api';
import { setFriendStatus, acceptFriend, declineFriend } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  state = {
    messageStyle: SCREEN_WIDTH < 400 ? (
      styles.messageSmallStyle
    ) : (
      styles.messageLargeStyle
    )
  }

  renderNotification = (item) => {
    const { navigation, currentUser, friend } = this.props;
    const { setFriendStatus, acceptFriend, declineFriend } = this.props;
    const { type, id, uid } = item;
    const { messageStyle } = this.state;

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
        messageStyle={messageStyle}
      />
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.notifications}
          renderItem={({ item }) => this.renderNotification(item)}
          keyExtractor={({ item }, postId) => postId.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageLargeStyle: {
    fontSize: 18,
    lineHeight: 24,
    width: SCREEN_WIDTH - 127
  },
  messageSmallStyle: {
    fontSize: 15,
    lineHeight: 18,
    width: SCREEN_WIDTH - 127
  }
});

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
