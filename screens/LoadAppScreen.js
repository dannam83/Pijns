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
      } else if (user.uid !== this.props.currentUid) {
        this.props.currentUserFound(user);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const redirect = this.props.navigation.navigate;

    if (nextProps.token) {
      redirect('Main');
    } else {
      redirect('Auth');
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

function mapStateToProps({ auth, user }) {
  return { token: auth.token, currentUid: user.uid };
}

export default connect(mapStateToProps, actions)(LoadAppScreen);
