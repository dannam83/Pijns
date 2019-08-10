import React, { Component } from 'react';

import Slides from '../components/Slides';
import { activeButtonBlue, backgroundBlue } from '../assets/colors';

const SLIDE_DATA = [
  { text: 'Welcome to Pijns!',
    color: backgroundBlue },
  { text: 'You can say Pijn like the bird, pigeon!',
    color: backgroundBlue },
  { text: 'Pijns is about encouraging people with prayer.',
    color: activeButtonBlue },
  { text: 'When friends share prayer requests, you can send them Pijn notes.',
    color: backgroundBlue },
  { text: "A note lets your friend know you've prayed for this prayer request.",
    color: activeButtonBlue },
  { text: 'You can send one Pijn note everyday for any prayer request.',
    color: backgroundBlue },
  { text: "Pray In Jesus' Name = PIJN",
    color: activeButtonBlue },
  { text: 'Thanks for being part of the family!',
    color: backgroundBlue },
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
