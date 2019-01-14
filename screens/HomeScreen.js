import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
  };

  render() {
    return (
      <View>
        <Button
          title="Write a post!"
          onPress={() => this.props.navigation.navigate('PostCreate')}
          backgroundColor="rgba(0,125,255,1)"
          borderRadius={20}
          icon={{ name: 'create' }}
        />
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, actions)(HomeScreen);
