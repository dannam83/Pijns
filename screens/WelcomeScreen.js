import React, { Component } from 'react';

import Slides from '../components/Slides';
import { activeButtonBlue, backgroundBlue } from '../assets/colors';

const SLIDE_DATA = [
  { text: 'Welcome to Pijns!',
    color: backgroundBlue },
  { text: 'Pijns is about encouraging people with prayer.',
    color: activeButtonBlue },
  { text: 'When friends share prayer requests, you can send them Pijn notes.',
    color: backgroundBlue },
  { text: "A note lets your friend know you've prayed for this prayer request.",
    color: activeButtonBlue },
  { text: "Pray In Jesus' Name = PIJN",
    color: backgroundBlue },
  { text: 'Thanks for being part of the community!',
    color: activeButtonBlue },
];

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default WelcomeScreen;
