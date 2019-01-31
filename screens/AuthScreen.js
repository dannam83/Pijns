import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';
import { Spinner } from '../components/common';
import { backgroundBlue } from '../assets/colors';

class AuthScreen extends Component {
  state = { isProcessing: false }

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

  onFbLoginPress = () => {
    this.setState({ isProcessing: true });
    this.props.fbLogin();
  }


  render() {
    const { containerViewStyle, logoTextStyle, logoStyle, buttonStyle } = styles;

    return (
      <View style={containerViewStyle}>
        <Text style={logoTextStyle}>Pijns</Text>
        <Image
          source={require('../assets/images/pijn.png')}
          style={logoStyle}
        />
        <Button
          title="Login with Facebook"
          onPress={this.onFbLoginPress}
          buttonStyle={buttonStyle}
        />
      {
        this.state.isProcessing ? <Spinner /> : null
      }
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
    backgroundColor: backgroundBlue
  },
  logoTextStyle: {
    fontFamily: 'coiny',
    fontSize: 32,
    color: 'white'
  },
  logoStyle: {
    width: 44,
    height: 40,
    tintColor: 'white'
  },
  buttonStyle: {
    marginTop: 25,
    backgroundColor: '#158cdb',
    borderRadius: 25
  }
});

function mapStateToProps({ auth, user }) {
  return { token: auth.token, isNew: user.isNew };
}

export default connect(mapStateToProps, actions)(AuthScreen);
