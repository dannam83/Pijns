import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { InputGrowing } from '../components/common';
import ChatList from '../components/chat/ChatList';
import { fetchChat, chatUnmount } from '../actions';
import {
  updateChatMessage,
  setChatListFriendData,
  resetUnread,
  incrementUnread
} from '../api/chat_list_api';
import {
  onChat,
  offChat,
  chatTypingStart,
  chatTypingEnd,
  chatMessageSave,
  sendMessageNotification,
} from '../api/chat_api';

class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat',
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const friendId = navigation.getParam('postAuthorId');
    const friend = navigation.getParam('friend');
    this.props.fetchChat({ userId: user.uid, friendId });
    this.state = { user, userId: user.uid, friendId, isTyping: false, friend };
  }

  componentDidMount() {
    const { userId, friendId } = this.state;
    onChat(userId, friendId);
    resetUnread(userId, friendId);
  }

  componentWillUnmount() {
    const { userId, friendId } = this.state;
    offChat(userId, friendId);
    this.props.chatUnmount(userId, friendId);
  }

  onChange = (text) => {
    const { userId, friendId, isTyping } = this.state;
    chatTypingStart(userId, friendId, text);

    if (!isTyping && text.length > 0) {
      this.setState({ isTyping: true });
    } else if (text.length === 0 && isTyping) {
      chatTypingEnd(userId, friendId);
      this.setState({ isTyping: false });
    }
  }

  saveChat = ({ postAuthorId, comment }) => {
    const { user, friendId, friend: { name, picture } } = this.state;
    const friendOnChat = this.props.chat[`${postAuthorId}_ON`];

    try {
      chatMessageSave(user, postAuthorId, comment);
      chatTypingEnd(user.uid, postAuthorId);
      this.setState({ isTyping: false });
      updateChatMessage(user.uid, postAuthorId, comment);
      setChatListFriendData(user, friendId, name, picture);
      if (!friendOnChat) {
        sendMessageNotification(user, postAuthorId, comment);
        incrementUnread(user.uid, friendId);
      }
    } catch (err) {
      console.warn('Error saving comment.', err);
    }
  }

  render() {
    const { chat, navigation } = this.props;
    const { user, userId, friendId } = this.state;
    const alreadyTyped = chat[userId];

    return (
      <View style={styles.containerStyle}>
        <ChatList
          postAuthorId={friendId}
          userId={user.uid}
          otherTyping={chat[friendId]}
          chat={chat.messages}
        />
        <InputGrowing
          user={user}
          postAuthorId={friendId}
          navigation={navigation}
          onSave={this.saveChat}
          placeholder="Say something..."
          value={alreadyTyped}
          onChange={(text) => this.onChange(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  }
});

function mapStateToProps(state) {
  const { chat } = state;
  return { chat };
}

export default connect(mapStateToProps, { fetchChat, chatUnmount })(ChatScreen);
