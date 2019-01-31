import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from '../actions';
import { backgroundBlue } from '../assets/colors'

class LoadAppScreen extends Component {
  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate('Auth');
      } else if (user.uid !== this.props.currentUid) {
        this.props.currentUserFound(user);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const redirect = this.props.navigation.navigate;
    this.props.fetchPijnLog();
    this.props.saveNavigation(this.props.navigation);

    if (nextProps.token) {
      redirect('Main');
    } else {
      redirect('Auth');
    }
  }

  render() {
    const { containerViewStyle, logoTextStyle, logoStyle } = styles;

    return (
      <View style={containerViewStyle}>
        <Text style={logoTextStyle}>Pijns</Text>
        <Image
          source={require('../assets/images/pijn.png')}
          style={logoStyle}
        />
      </View>
    );
  }
}

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
  }
});

function mapStateToProps({ auth, user }) {
  return { token: auth.token, currentUid: user.uid };
}

export default connect(mapStateToProps, actions)(LoadAppScreen);
