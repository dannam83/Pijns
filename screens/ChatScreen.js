import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat',
  };

  render() {
    return (
      <View>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
      </View>
    );
  }
}

export default (ChatScreen);
