import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ActionButton } from '../common';

class MessagesIcon extends Component {
  onPress = () => {
    const { navigation } = this.props;
    navigation.navigate('AllChatsScreen');
  }

  render() {
    const { messages } = this.props;
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

const styles = StyleSheet.create({
  badgeViewStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 14,
    marginTop: -4,
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
