import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import AllChatsList from '../components/chat/AllChatsList';

const SCREEN_WIDTH = Dimensions.get('window').width;

class AllChatsScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

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
    const { chats, user, navigation } = this.props;

    return (
      <AllChatsList
        chats={chats}
        user={user}
        navigation={navigation}
        screenWidth={SCREEN_WIDTH}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user, chatList, navigation } = state;

  const chats = _.map(chatList, (val, key) => {
    return { ...val, chatId: key };
  }).sort((a, b) => a.lastMessageTimestamp - b.lastMessageTimestamp);

  return { chats, user, navigation };
}

export default connect(mapStateToProps, {})(AllChatsScreen);
