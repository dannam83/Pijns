import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Dimensions } from 'react-native';

import { chatBubbleGray, chatBorderGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatListMessage extends Component {
  renderUserMessage(message) {
    const { userMessage, textStyle } = styles;

    return (
      <View style={userMessage}>
        <Text style={textStyle}>{message}</Text>
      </View>
    );
  }

  renderOtherMessage(message) {
    const { otherMessage, textStyle } = styles;

    return (
      <View style={otherMessage}>
        <Text style={textStyle}>{message}</Text>
      </View>
    );
  }

  render() {
    const {
      userContainer,
      otherContainer,
    } = styles;
    const { message, userId } = this.props.message;
    const containerStyle = userId === this.props.userId ? otherContainer : otherContainer;

    return (
      <View style={containerStyle}>
        {this.renderOtherMessage(message)}
      </View>
    );
  }
}

const styles = {
  userContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userMessage: {
    padding: 10,
    marginTop: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: chatBubbleGray,
    marginLeft: 60,
    marginRight: 9,
  },
  otherContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  otherMessage: {
    padding: 10,
    marginTop: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: chatBorderGray,
    marginLeft: 9,
    marginRight: 40,
  },
  textStyle: {
    fontSize: 16
  },
};

function mapStateToProps(state) {
  return { userId: state.user.uid };
}

export default connect(mapStateToProps)(ChatListMessage);
