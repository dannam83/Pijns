import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class FriendPostsScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
    headerTitleStyle: {
      color: '#03A9F4',
      fontFamily: 'coiny',
      fontSize: 20,
    },
  };

  logoutPress = () => {
    this.props.logout(() => {
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View>
        <Text>FriendPostsScreen</Text>
        <Text>FriendPostsScreen</Text>
        <Text>FriendPostsScreen</Text>
        <Text>FriendPostsScreen</Text>
        <Text>FriendPostsScreen</Text>

        <Button
          title="Logout"
          large
          icon={{ name: 'settings' }}
          backgroundColor="#F44336"
          onPress={this.logoutPress}
        />
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(FriendPostsScreen);
