import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { resetMessagesCount } from '../api/chat_api';
import { fetchChatList, chatListUnmount } from '../actions';

class ChatListScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  componentDidMount() {
    this.props.fetchChatList(this.props.user.uid);
  }
  //
  // renderRequest = (item) => {
  //   const { navigation, currentUser, friend } = this.props;
  //   const { setFriendStatus, acceptFriend, declineFriend } = this.props;
  //
  //   return (
  //     <FriendRequest
  //       item={item}
  //       navigation={navigation}
  //       currentUser={currentUser}
  //       friend={friend}
  //       actions={{ setFriendStatus, acceptFriend, declineFriend }}
  //     />
  //   );
  // }
  //
  // renderNotification = (item) => {
  //   const { navigation, currentUser, friend } = this.props;
  //   const { setFriendStatus, acceptFriend, declineFriend } = this.props;
  //   const { type } = item;
  //
  //   return (!type || type === 'FriendRequest') ? (
  //     <FriendRequest
  //       item={item}
  //       navigation={navigation}
  //       currentUser={currentUser}
  //       friend={friend}
  //       actions={{ setFriendStatus, acceptFriend, declineFriend }}
  //     />
  //   ) : (
  //     <Notification
  //       item={item}
  //       navigation={navigation}
  //       currentUser={currentUser}
  //       navigationTab={'Notifications'}
  //     />
  //   );
  // }
  //
  // render() {
  //   return (
  //     <View style={{ padding: 10 }}>
  //       <FlatList
  //         data={this.props.notifications}
  //         renderItem={({ item }) => this.renderNotification(item)}
  //         keyExtractor={({ item }, postId) => postId.toString()}
  //       />
  //     </View>
  //   );
  // }
  render() {
    return (
      <View>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { user, chatList } = state;

  const chats = _.map(chatList, (val, key) => {
    return { ...val, chatId: key };
  }).sort((a, b) => a.lastMessageTimestamp - b.lastMessageTimestamp);

  return { chats, user };
}

export default connect(mapStateToProps, {
  fetchChatList, chatListUnmount })(ChatListScreen);
