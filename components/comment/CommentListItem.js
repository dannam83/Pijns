import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import { postEditUpdate } from '../../actions';

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
      mainViewStyle,
      thumbnailStyle,
      textViewStyle,
      nameStyle,
      commentStyle,
      buttonTextStyle,
      buttonStyle
    } = styles;

    const { name, picture } = author;

    return (
      <Card containerStyle={containerStyle}>
        <View style={mainViewStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: picture }}
          />
          <View style={textViewStyle}>
            <Text style={nameStyle}>{name}</Text>
            <Text style={commentStyle}>{comment}</Text>
          </View>
          <TouchableOpacity style={buttonStyle}>
            <Text style={buttonTextStyle} onPress={this.saveComment}>Post</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderottomWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  mainViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  textViewStyle: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  nameStyle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 1
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
    // marginBottom: 19
  },
  buttonStyle: {
    height: 47,
    width: 47,
    borderRadius: 25,
    // marginBottom: 19,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,125,255,1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: 'rgba(0,125,255,1)',
    fontSize: 16,
    fontWeight: '600'
  }
};

export default connect(null, { postEditUpdate })(CommentListItem);
