import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { postEditUpdate } from '../../actions';
import { ActionButton } from '../../components/common';

class CommentListItem extends Component {
  render() {
    const {
      author,
      comment,
      likes,
      timestamp,
      createdOn,
      navigation
    } = this.props.comment;

    const {
      containerStyle,
      thumbnailStyle,
      textViewStyle,
      commentHeaderStyle,
      nameStyle,
      likesStyle,
      commentStyle,
      buttonStyle,
      iconNotLikedStyle,
      iconLikedStyle,
    } = styles;

    const { name, picture } = author;
    const iconStyle = iconLikedStyle;

    return (

      <View style={containerStyle}>
        <Image
          style={thumbnailStyle}
          source={{ uri: picture }}
        />
        <View style={textViewStyle}>
          <View style={commentHeaderStyle}>
            <Text style={nameStyle}>{name}</Text>
            <Text style={likesStyle}>12</Text>
          </View>
          <Text style={commentStyle}>{comment}</Text>
        </View>
        <ActionButton
          imageSource={require('../../assets/images/heart.png')}
          buttonStyle={buttonStyle}
          iconStyle={iconStyle}
        />
      </View>

    );
  }
}
// onPress={() => sendPijn({ postId, author, currentDate })}
// disabled={alreadyLiked}
// <TouchableOpacity style={buttonStyle}>
// <Text style={buttonTextStyle} onPress={this.saveComment}>Post</Text>
// </TouchableOpacity>

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
  textViewStyle: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  commentHeaderStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameStyle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 1
  },
  likesStyle: {
    fontSize: 14,
    marginBottom: 1,
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
  },
  buttonStyle: {
    height: 47,
    width: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginLeft: 8,
    // marginTop: 4
    // borderRadius: 25,
    // marginLeft: 8,
    // borderWidth: 1,
    // borderColor: 'rgba(0,125,255,1)',
    // display: 'flex',
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

export default connect(null, { postEditUpdate })(CommentListItem);
