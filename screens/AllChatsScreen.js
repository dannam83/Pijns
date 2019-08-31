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
