import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Dimensions } from 'react-native';

import { chatTypingGray } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatListTyping extends Component {
  // const { typing } = this.props;
  render() {
    const { thumbnailStyle, container } = styles;

    return (
      <View style={container}>
        <Image
          style={thumbnailStyle}
          source={require('../../assets/images/typing.png')}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    width: SCREEN_WIDTH,
    paddingLeft: 20,
  },
  thumbnailStyle: {
    height: 35,
    width: 35,
    tintColor: chatTypingGray
  },
};

function mapStateToProps(state) {
  return { userId: state.user.uid };
}

export default connect(mapStateToProps)(ChatListTyping);
