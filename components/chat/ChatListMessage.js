import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Dimensions } from 'react-native';

import { chatBubbleGray, chatBorderGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatListMessage extends Component {
  renderUserMessage(message) {
    const { userContainer, userMessage, textStyle } = styles;

    return (
      <View style={userContainer}>
        <View style={userMessage}>
          <Text style={textStyle}>{message.message}</Text>
        </View>
      </View>
    );
  }

  renderOtherMessage(message) {
    const { thumbnailStyle, otherContainer, otherMessage, textStyle } = styles;

    return (
      <View style={otherContainer}>
        <Image style={thumbnailStyle} source={{ uri: message.userPic }} />
        <View style={otherMessage}>
          <Text style={textStyle}>{message.message}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { message, userId } = this.props;

    return (
      <View>
        {
          userId === message.userId ?
            this.renderUserMessage(message) : this.renderOtherMessage(message)
        }
      </View>
    );
  }
}

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
    height: 35,
    width: 35,
    borderRadius: 18,
  },
};

function mapStateToProps(state) {
  return { userId: state.user.uid };
}

export default connect(mapStateToProps)(ChatListMessage);
