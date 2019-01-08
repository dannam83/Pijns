import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to job app', color: '#03A9F4' },
  { text: 'This app will help you find jobs', color: '#009688' },
  { text: 'Select your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token: true });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }

    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default WelcomeScreen;
