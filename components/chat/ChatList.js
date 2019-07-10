import React from 'react';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import ChatListDay from './ChatListDay';
import ChatListTyping from './ChatListTyping';

const ChatList = ({ chat, userId, otherTyping }) => {
  const formatChat = () => {
    let chatDays = _.map(chat, (val, key) => {
      const messages = _.map({ ...val }, (message, messageId) => {
        return { ...message, messageId };
      });
      return { messages, dateTimestamp: key };
    });
    return chatDays.reverse();
  };

  const showChatTyping = (isTyping) => {
    return (
      <View style={{ height: 25 }}>
        { isTyping ? <ChatListTyping /> : null }
      </View>
    );
  };

  const renderRow = (chatDay) => {
    return (
      <ChatListDay chatDay={chatDay} userId={userId} />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        inverted
        data={formatChat()}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={({ item }, date) => date.toString()}
      />
      {showChatTyping(otherTyping)}
    </View>
  );
};

export default ChatList;
