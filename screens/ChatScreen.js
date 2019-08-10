import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { InputGrowing } from '../components/common';
import ChatList from '../components/chat/ChatList';
import {
  fetchChat,
  chatTypingStart,
  chatTypingEnd,
  chatMessageSave,
  chatDetachListener
} from '../actions';

class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat',
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const postAuthorId = navigation.getParam('postAuthorId');
    this.props.fetchChat({ userId: user.uid, friendId: postAuthorId });
    this.state = { isTyping: false };
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const postAuthorId = navigation.getParam('postAuthorId');
    this.props.chatDetachListener(user.uid, postAuthorId);
  }

  onChange = (text, userId, postAuthorId) => {
    const isTyping = this.state.isTyping;
    this.props.chatTypingStart(userId, postAuthorId, text);

    if (!isTyping && text.length > 0) {
      this.setState({ isTyping: true });
    } else if (text.length === 0 && isTyping) {
      this.props.chatTypingEnd(userId, postAuthorId);
      this.setState({ isTyping: false });
    }
  }

  saveChat = ({ user, postAuthorId, comment }) => {
    try {
      this.props.chatMessageSave(user, postAuthorId, comment);
      this.props.chatTypingEnd(user.uid, postAuthorId);
      this.setState({ isTyping: false });
    } catch (err) {
      console.warn('Error saving comment.', err);
    }
  }

  render() {
    const { chat, navigation } = this.props;
    const user = navigation.getParam('user');
    const postAuthorId = navigation.getParam('postAuthorId');
    const alreadyTyped = chat[user.uid];

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidStyle}
        behavior="padding"
        enabled
        keyboardVerticalOffset={80}
      >
        <ChatList
          postAuthorId={postAuthorId}
          userId={user.uid}
          otherTyping={chat[postAuthorId]}
          chat={chat.messages}
        />
        <InputGrowing
          user={user}
          postAuthorId={postAuthorId}
          navigation={navigation}
          onSave={this.saveChat}
          placeholder="Say something..."
          value={alreadyTyped}
          onChange={
            (text, userId, postAuthId) => this.onChange(text, userId, postAuthId)}
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

export default connect(mapStateToProps, {
  fetchChat, chatTypingStart, chatTypingEnd, chatMessageSave, chatDetachListener
})(ChatScreen);
