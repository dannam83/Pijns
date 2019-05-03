import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ChatListMessage from './ChatListMessage';
import { lightTextGray } from '../../assets/colors';
import { getDateFromTimestamp } from '../../functions/common';

class ChatListDay extends Component {
  renderMessages = (messages) => {
    return (
      messages.map(message => {
        return (
          <ChatListMessage
            message={message}
            key={message.messageId}
          />
        );
      })
    );
  }

  render() {
    const { containerStyle, dateStyle } = styles;
    const { dateTimestamp, messages } = this.props.chatDay;
    const date = getDateFromTimestamp(parseInt(dateTimestamp, 10));
    console.log('timestamp', dateTimestamp);
    console.log('date', date);

    return (
      <View style={containerStyle}>

        <Text style={dateStyle}>{date}</Text>
        {this.renderMessages(messages)}

      </View>
    );
  }
}

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

export default(ChatListDay);
