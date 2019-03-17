import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import { likeComment } from '../../actions';
import { lightTextGray } from '../../assets/colors';

class ChatListMessage extends Component {
  render() {
    const { containerStyle, thumbnailStyle, textViewStyle } = styles;
    const { message, userId, userPic } = this.props.message;
    console.log(message);

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
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  },
  textViewStyle: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  commentHeaderStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentHeaderFrontStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 1,
  },
  nameStyle: {
    fontWeight: '700',
    fontSize: 16
  },
  timeAgoStyle: {
    color: lightTextGray,
    paddingLeft: 8,
    marginBottom: 1.5,
  },
  likesStyle: {
    paddingTop: 0.5,
    fontStyle: 'italic',
    color: '#808080'
  },
  commentStyle: {
    color: '#000',
    fontSize: 16,
    lineHeight: 20,
  },
  thumbnailStyle: {
    height: 47,
    width: 47,
    borderRadius: 25,
    marginRight: 8,
    marginLeft: 8,
  },
  buttonStyle: {
    height: 47,
    width: 22,
    paddingTop: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconNotLikedStyle: {
    height: 17,
    width: 17,
    tintColor: '#D3D3D3'
  },
  iconLikedStyle: {
    height: 17,
    width: 17,
    tintColor: '#FF0000'
  },
};

function mapStateToProps(state) {
  const { user, activePost, postCommentLikes } = state;
  return { user, activePost, postCommentLikes };
}

export default connect(mapStateToProps, { likeComment })(ChatListMessage);
