import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';

import * as actions from '../actions';

class LoadAppScreen extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'coiny': require('../assets/fonts/Coiny-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
    this.props.alreadyLoggedIn();
    this.onAuthComplete(this.props);
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
        {
          this.state.fontLoaded ? (
            <Text style={styles.logoTextStyle}>Pijns</Text>
          ) : null
        }
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
