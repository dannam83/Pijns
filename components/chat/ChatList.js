import React from 'react';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import ChatDay from './ChatDay';
import ChatTyping from './ChatTyping';

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
        { isTyping ? <ChatTyping /> : null }
      </View>
    );
  };

  const renderRow = (chatDay) => {
    return (
      <ChatDay chatDay={chatDay} userId={userId} />
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
