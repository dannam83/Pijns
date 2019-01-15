import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    const redirect = this.props.navigation.navigate;
    
    if (props.token) {
      if (props.isNew) {
        redirect('Welcome');
      } else {
        redirect('Main');
      }
    }
  }

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <Text style={styles.logoTextStyle}>Pijns</Text>
        <Button
          title="Login with Facebook"
          onPress={this.props.fbLogin}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    );
  }
}
//   <Button
//      title="Login with Google"
//      onPress={this.props.googleLogin}
//      buttonStyle={styles.buttonStyle}
//   />

const styles = StyleSheet.create({
  containerViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#03A9F4'
  },
  logoTextStyle: {
    fontFamily: 'coiny',
    fontSize: 32,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#158cdb',
    borderRadius: 25
  }
});

function mapStateToProps({ auth, user }) {
  return { token: auth.token, isNew: user.isNew };
}

export default connect(mapStateToProps, actions)(AuthScreen);
