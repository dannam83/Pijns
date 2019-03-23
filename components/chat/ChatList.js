import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import ChatListDay from './ChatListDay';
import ChatListTyping from './ChatListTyping';

class ChatList extends Component {
  formatChat(chat) {
    let chatDays = _.map(chat, (val, key) => {
      const messages = _.map({ ...val }, (message, messageId) => {
        return { ...message, messageId };
      });
      return { messages, date: key };
    });
    return chatDays.reverse();
  }

  showChatTyping(isTyping) {
    return isTyping ? (
      <View style={{ paddingBottom: 5 }}>
        <ChatListTyping />
      </View>
    ) : null;
  }

  renderRow = (chatDay) => {
    return (
      <ChatListDay chatDay={chatDay} />
    );
  }

  render() {
    const { chat, otherTyping } = this.props;
    console.log(this.props);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          inverted
          data={this.formatChat(chat)}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={({ item }, date) => date.toString()}
        />
        {this.showChatTyping(otherTyping)}
      </View>
    );
  }
}

export default(ChatList);
