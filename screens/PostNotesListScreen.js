import React, { Component } from 'react';
import { View, Text } from 'react-native';

class PostNotesListScreen extends Component {
  static navigationOptions = {
    title: 'Notes',
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

export default (PostNotesListScreen);
