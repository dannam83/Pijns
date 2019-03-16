import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import ChatListDay from './ChatListDay';

class ChatList extends Component {
  renderRow = (chatDay) => {
    return (
      <ChatListDay chatDay={chatDay} />
    );
  }

  render() {
    const { chatDays } = this.props;

    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={chatDays}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={({ item }, date) => date.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  writeCommentView: {
    paddingTop: 13
  }
};

function mapStateToProps(state) {
  let chatDays = _.map(state.chat.messages, (val, key) => {
    const messages = { ...val };
    return { messages, date: key };
  });
  return { chatDays };
}

export default connect(mapStateToProps)(ChatList);
