import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Dimensions } from 'react-native';

import { likeComment } from '../../actions';
import { lightTextGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatListMessage extends Component {
  render() {
    const { containerStyle, thumbnailStyle, textViewStyle } = styles;
    const { message, userId, userPic } = this.props.message;

    return (
      <View style={containerStyle}>
        <Image
          style={thumbnailStyle}
          source={{ uri: userPic }}
        />

        <Text>{message}</Text>

        <Image
          style={thumbnailStyle}
          source={{ uri: userPic }}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    // display: 'flex',
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    width: SCREEN_WIDTH
  },
  textViewStyle: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  thumbnailStyle: {
    height: 47,
    width: 47,
    borderRadius: 25,
    marginRight: 8,
    marginLeft: 8,
  },
};

function mapStateToProps(state) {
  const { user, activePost, postCommentLikes } = state;
  return { user, activePost, postCommentLikes };
}

export default connect(mapStateToProps, { likeComment })(ChatListMessage);
