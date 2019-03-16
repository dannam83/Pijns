import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import { likeComment } from '../../actions';
import { displayTimeAgo } from '../../functions/common';
import { lightTextGray } from '../../assets/colors';

class ChatListDay extends Component {
  renderMessage = (chatDay) => {
    return (
      <ChatListDay chatDay={chatDay} />
    );
  }

  render() {
    console.log(this.props.chatDay);
    const { containerStyle } = styles;
    const { date, messages } = this.props.chatDay;

    return (
      <View style={containerStyle}>
        <Text>{date}</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  },
};

function mapStateToProps(state) {
  const { user, activePost, postCommentLikes } = state;
  return { user, activePost, postCommentLikes };
}

export default connect(mapStateToProps, { likeComment })(ChatListDay);
