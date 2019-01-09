import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Username',
  };

  logoutPress = () => {
    this.props.logout(() => {
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View>
        <Text>ProfileScreen</Text>
        <Text>ProfileScreen</Text>
        <Text>ProfileScreen</Text>
        <Text>ProfileScreen</Text>
        <Text>ProfileScreen</Text>

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

export default connect(mapStateToProps, actions)(ProfileScreen);
