import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { Input } from '../components/common'
import * as actions from '../actions';

class PostCommentsScreen extends Component {
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Text>PostCommentsScreen</Text>
          <Button
            title="Logout"
            large
            icon={{ name: 'settings' }}
            backgroundColor="#F44336"
            onPress={this.logoutPress}
          />
          <Input />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1
  }
};

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(PostCommentsScreen);
