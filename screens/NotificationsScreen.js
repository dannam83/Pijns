import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Request from '../components/notification/Request';
import Notification from '../components/notification/Notification';
import { setFriendStatus, acceptFriend, declineFriend } from '../actions';

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

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

    return (
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

  return { currentUser: user, friend, requests, notifications };
}

export default connect(mapStateToProps, {
  setFriendStatus,
  acceptFriend,
  declineFriend
})(NotificationsScreen);
