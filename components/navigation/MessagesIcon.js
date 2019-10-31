import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { ActionButton } from '../common';


class MessagesIcon extends Component {
  onPress = () => {
    const { navigation } = this.props;
    navigation.navigate('AllChatsScreen');
  }

  render() {
    const { name, size, focused, color, messages } = this.props;
    const chat = require('../../assets/images/directMessage.png');

    return (
      <View>
        <ActionButton
          imageSource={chat}
          onPress={this.onPress}
          iconStyle={{ width: 28, height: 28 }}
        />

        {messages > 0 ?
          <View style={styles.badgeViewStyle}>
            <Text style={styles.badgeStyle}>
              { messages < 100 ? messages : '!!' }
            </Text>
          </View>
          :
          null
        }
      </View>
    );
  }
}

// const chatOrHandsButton = () => {
//   if (author.id !== user.uid) {
//     const chat = require('../../assets/images/directMessage.png');
//
//     return <ActionButton imageSource={chat} onPress={goToChat} />;
//   }
//
//   const whStyle = answered ? worshipHandsActive : worshipHandsInactive;
//   const hands = require('../../assets/images/praise.png');
//
//   return <ActionButton imageSource={hands} onPress={handsPress} iconStyle={whStyle} />;
// };
//
// if (pinnedOnly && !pinned) {
//   return null;
// }

const styles = StyleSheet.create({
  badgeViewStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginTop: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  badgeStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
  const { messagesCount, navigation, user } = state;
  return ({ messages: messagesCount, navigation, userId: user.uid });
}

export default connect(mapStateToProps)(MessagesIcon);
