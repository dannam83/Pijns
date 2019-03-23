import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { InputGrowing } from '../components/common';
import ChatList from '../components/chat/ChatList';
import {
  fetchChat,
  chatTypingStart,
  chatTypingEnd,
  chatClear,
  chatMessageSave
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
    const userId = navigation.getParam('user').uid;
    const postAuthorId = navigation.getParam('postAuthorId');
    this.props.chatTypingEnd(userId, postAuthorId);
    this.props.chatClear(userId, postAuthorId);
  }

  onChange = (text, userId, postAuthorId) => {
    const isTyping = this.state.isTyping;

    if (!isTyping && text.length > 0) {
      this.props.chatTypingStart(userId, postAuthorId);
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
    } catch (err) {
      console.warn('Error saving comment.', err);
    }
  }

  render() {
    const { chat, navigation } = this.props;
    const user = navigation.getParam('user');
    const postAuthorId = navigation.getParam('postAuthorId');
    const postId = navigation.getParam('postId');
    const index = navigation.getParam('index');

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidStyle}
        behavior="padding"
        enabled
        keyboardVerticalOffset={80}
      >
        <ChatList
          postAuthorId={postAuthorId}
          postId={postId}
          user={user}
          otherTyping={chat[postAuthorId]}
          chat={chat.messages}
        />
        <InputGrowing
          user={user}
          postAuthorId={postAuthorId}
          postId={postId}
          navigation={navigation}
          index={index}
          onSave={this.saveChat}
          placeholder="Say something..."
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
  fetchChat, chatTypingStart, chatTypingEnd, chatClear, chatMessageSave
})(ChatScreen);
