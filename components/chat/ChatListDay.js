import React from 'react';
import { View, Text } from 'react-native';

import ChatListMessage from './ChatListMessage';
import { lightTextGray } from '../../assets/colors';
import { getDateFromTimestamp } from '../../functions/common';

const ChatListDay = ({ chatDay, userId }) => {
  const { dateTimestamp, messages } = chatDay;

  const renderMessages = () => {
    return (
      messages.map(message => {
        return (
          <ChatListMessage
            message={message}
            key={message.messageId}
            userId={userId}
          />
        );
      })
    );
  };

  const { containerStyle, dateStyle } = styles;
  const date = getDateFromTimestamp(parseInt(dateTimestamp, 10));

  return (
    <View style={containerStyle}>
      <Text style={dateStyle}>{date}</Text>
      {renderMessages()}
    </View>
  );
};

const styles = {
  containerStyle: {
    alignItems: 'center'
  },
  dateStyle: {
    marginTop: 15,
    marginBottom: 17,
    color: lightTextGray,
    fontStyle: 'italic',
  }
};

export default ChatListDay;
