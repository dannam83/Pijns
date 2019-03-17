import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Dimensions } from 'react-native';

import { likeComment } from '../../actions';
import { lightTextGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatListMessage extends Component {
  render() {
    const { containerStyle } = styles;
    const { message, userId } = this.props.message;

    return (
      <View style={containerStyle}>
        <Text>{message}</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
    padding: 10,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: 'green',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 25,
    // width: SCREEN_WIDTH
  },
  textViewStyle: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
};

function mapStateToProps(state) {
  const { user, activePost, postCommentLikes } = state;
  return { user, activePost, postCommentLikes };
}

export default connect(mapStateToProps, { likeComment })(ChatListMessage);
