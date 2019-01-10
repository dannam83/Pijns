import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
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
    if (props.token) {
      this.props.navigation.navigate('Main');
    }
  }

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <Button
          title="Login with Facebook"
          backgroundColor="#03A9F4"
          onPress={this.props.fbLogin}
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
  }
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
