import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from '../actions';

class LoadAppScreen extends Component {
  constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate('Auth');
      } else {
        this.props.currentUserFound(user);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Main');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <Text style={styles.logoTextStyle}>Pijns</Text>
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
    backgroundColor: '#03A9F4'
  },
    logoTextStyle: {
    fontFamily: 'coiny',
    fontSize: 32,
    color: 'white'
  }
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(LoadAppScreen);
