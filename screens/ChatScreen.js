import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { InputGrowing } from '../components/common';
import ChatList from '../components/chat/ChatList';
import { fetchChat, chatUnmount } from '../actions';
import { sendChatNotification } from '../api/notifications_api';
import { updateChatListMessage, setChatListFriendData } from '../api/chat_list_api';
import {
  onChat,
  offChat,
  chatTypingStart,
  chatTypingEnd,
  chatMessageSave,
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
    // if (this.props.chat.messages !== 0) {
    //
    // }
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

  saveChat = ({ user, postAuthorId, comment }) => {
    const friendOnChat = this.props.chat[`${postAuthorId}_ON`];
    // if (this.props.chat.messages === 0) {
    //   setChatListFriendData()
    // }

    try {
      chatMessageSave(user, postAuthorId, comment);
      chatTypingEnd(user.uid, postAuthorId);
      updateChatListMessage(user.uid, postAuthorId, comment);
      this.setState({ isTyping: false });
      if (!friendOnChat) { sendChatNotification(user, postAuthorId, comment); }
    } catch (err) {
      console.warn('Error saving comment.', err);
    }
  }

  render() {
    const { chat, navigation } = this.props;
    const { user, userId, friendId } = this.state;
    const alreadyTyped = chat[userId];

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidStyle}
        behavior="padding"
        enabled
        keyboardVerticalOffset={80}
      >
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  keyboardAvoidStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  }
};

function mapStateToProps(state) {
  const { chat } = state;
  return { chat };
}

export default connect(mapStateToProps, { fetchChat, chatUnmount })(ChatScreen);
