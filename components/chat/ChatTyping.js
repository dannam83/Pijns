import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import { chatTypingGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ChatTyping = () => {
  const { textStyle, container } = styles;

  return (
    <View style={container}>
      <Text style={textStyle}>typing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    paddingLeft: 15,
    paddingTop: 5,
    marginBottom: -5
  },
  textStyle: {
    fontStyle: 'italic',
    color: chatTypingGray
  },
  thumbnailStyle: {
    height: 20,
    width: 20,
    tintColor: chatTypingGray
  },
});

export default ChatTyping;
