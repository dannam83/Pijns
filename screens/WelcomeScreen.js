import React, { Component } from 'react';

import Slides from '../components/Slides';
import { activeButtonBlue, backgroundBlue } from '../assets/colors';

const SLIDE_DATA = [
  { text: 'Welcome to Pijns!',
    color: backgroundBlue },
  { text: 'You can say Pijn like the bird, pigeon!',
    color: activeButtonBlue },
  { text: 'Pijns is about encouraging people with prayer.',
    color: backgroundBlue },
  { text: 'When Noah was on his arc, it was the pigeon that came back with an olive branch, a message of hope.',
    color: activeButtonBlue },
  { text: 'And now, when friends share prayer requests, you can also send messages of hope by sending Pijn notes!',
    color: backgroundBlue },
  { text: `Sending a Pijn note simply says, "You're in my thoughts, and I'm praying for you."`,
    color: activeButtonBlue },
  { text: 'For each prayer request, you can send that request one Pijn note every single day.',
    color: backgroundBlue },
  { text: "So every single day you can let your friends know that you're praying them!",
    color: activeButtonBlue },
  { text: "Also...\nPray In Jesus' Name = PIJN",
    color: backgroundBlue },
  { text: 'Thanks for being part of the family!',
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
