import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';
import { Spinner, Confirm } from '../components/common';
import { backgroundBlue } from '../assets/colors';

class AuthScreen extends Component {
  state = { isProcessing: false }

  componentDidMount() {
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  async onAuthComplete(props) {
    const { user, token, navigation } = props;

    if (!token) {
      this.setState({ isProcessing: false });
    } else {
      if (user.uid) {
        await Promise.all([
          props.fetchUserFeed(user.uid),
          props.fetchPijnLog(user.uid),
          props.fetchPinboard(user.uid),
          props.fetchRequests(user.uid),
          props.fetchNotifications(user.uid),
          props.fetchChatList(user.uid),
          props.listenToNotificationsCount(user.uid),
          props.saveNavigation(navigation)
        ]);
      }

      if (props.isNew) {
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('Main');
      }
    }
  }

  onFbLoginPress = async () => {
    this.setState({ isProcessing: true });
    this.props.fbLogin();
  }

  render() {
    const { containerViewStyle, logoTextStyle, logoStyle, buttonStyle } = styles;
    const { loginFailModalVisible, loginFailConfirm } = this.props;
    const line1 = 'Oops, something happened while logging in.';
    const line2 = 'Contact us at pijnsteam@gmail.com if this keeps happening.';

    return (
      <View style={containerViewStyle}>
        <Confirm
          visible={loginFailModalVisible}
          acceptText={'Ok'}
          onAccept={loginFailConfirm}
        >
          {line1} {line2}
        </Confirm>
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
  const { token, loginFailModalVisible } = auth;

  return { user, token, loginFailModalVisible, isNew: user.isNew };
}

export default connect(mapStateToProps, actions)(AuthScreen);
