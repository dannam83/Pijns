import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import { chatBubbleGray, chatBorderGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ChatMessage = ({ message, userId }) => {
  const renderUserMessage = () => {
    const { userContainer, userMessage, textStyle } = styles;

    return (
      <View style={userContainer}>
        <View style={userMessage}>
          <Text style={textStyle}>{message.message}</Text>
        </View>
      </View>
    );
  };

  const renderOtherMessage = () => {
    const { thumbnailStyle, otherContainer, otherMessage, textStyle } = styles;

    return (
      <View style={otherContainer}>
        <Image style={thumbnailStyle} source={{ uri: message.userPic }} />
        <View style={otherMessage}>
          <Text style={textStyle}>{message.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      {userId === message.userId ? renderUserMessage() : renderOtherMessage()}
    </View>
  );
};

const styles = {
  userContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 60,
    paddingRight: 9,
  },
  userMessage: {
    padding: 10,
    marginTop: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: chatBubbleGray,
  },
  otherContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 9,
    paddingRight: 60
  },
  otherMessage: {
    padding: 10,
    marginTop: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: chatBorderGray,
    marginLeft: 9,
  },
  textStyle: {
    fontSize: 16
  },
  thumbnailStyle: {
    padding: 10,
    height: 25,
    width: 25,
    borderRadius: 12,
  },
};

export default ChatMessage;
