import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { Input } from '../components/common';
import * as actions from '../actions';

class PostCommentsScreen extends Component {
  static navigationOptions = {
    title: 'Username',
  };

  state = {
    newValue: '',
    height: 40
  }

  logoutPress = () => {
    this.props.logout(() => {
      this.props.navigation.navigate('Auth');
    });
  }

  updateSize = (height) => {
    this.setState({ height });
  }

  render() {
    const { newValue, height } = this.state;
    let newStyle = { height };

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          placeholder="Your Placeholder"
          onChangeText={(value) => this.setState({ newValue: value })}
          style={[newStyle]}
          editable
          multiline
          value={newValue}
          onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    backgroundColor: 'green'
  }
};

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(PostCommentsScreen);
