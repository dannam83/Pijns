import React, { Component } from 'react';
import { View, Text } from 'react-native';

class TestScreen extends Component {
  static navigationOptions = {
    title: 'Test Screen',
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

export default (TestScreen);
