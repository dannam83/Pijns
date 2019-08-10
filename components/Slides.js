import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { slideButtonBlue, chatTypingGray } from '../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Slides extends Component {
  renderBottom(idx) {
    const { length } = this.props.data;
    if (idx === length - 1) {
      return (
        <Button
          title='Get started!'
          raised
          buttonStyle={styles.slideButton}
          onPress={this.props.onComplete}
        />
      );
    }

    return (
      <View style={[styles.dotsViewStyle, { height: SCREEN_HEIGHT / 2 }]}>
        {this.renderDots(length, idx)}
      </View>
    );
  }

  renderDots(length, idx) {
    const dots = [];
    for (let i = 0; i < length; i++) {
      const liveDotStyle = (i === idx) ? { tintColor: chatTypingGray } : {};
      dots.push(
        <Image
          source={require('../assets/images/dot.png')}
          style={[styles.dotsStyle, liveDotStyle]}
          key={i}
        />
      );
    }
    return dots;
  }

  renderSlides() {
    return this.props.data.map((slide, idx) => {
      return (
        <View
          key={slide.text}
          style={[styles.slide, { backgroundColor: slide.color }]}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderBottom(idx)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  slideButton: {
    backgroundColor: slideButtonBlue,
    marginTop: 15,
    borderRadius: 25
  },
  dotsViewStyle: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  dotsStyle: {
    height: 7,
    width: 7,
    marginLeft: 3,
    marginRight: 3,
    tintColor: 'white',
  }
};

export default Slides;
