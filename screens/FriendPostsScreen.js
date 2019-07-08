import React, { Component } from 'react';

import PostListFriends from '../components/post/PostListFriends';
import { ActionButtonStill } from '../components/common';
import { disabledGray } from '../assets/colors';

class FriendPostsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pijns',
      headerTitleStyle: {
        color: '#03A9F4',
        fontFamily: 'coiny',
        fontSize: 20,
      },
      headerRight: (
        <ActionButtonStill
          onPress={navigation.getParam('pinToggle')}
          iconName={'pushpino'}
          iconSize={22}
          iconStyle={navigation.getParam('headerPinStyle')}
        />
      )
    };
  };

  state = {
    pinPressed: false,
  }

  componentDidMount() {
    this.props.navigation.setParams({
      pinToggle: this.pinToggle,
      headerPinStyle: styles.pinStyle
    });
  }

  pinToggle = () => {
    const { pinStyle, pinnedStyle } = styles;

    if (!this.state.pinPressed) {
      this.setState({ pinPressed: true });
      this.props.navigation.setParams({ headerPinStyle: pinnedStyle });
    } else {
      this.setState({ pinPressed: false });
      this.props.navigation.setParams({ headerPinStyle: pinStyle });
    }
  }

  render() {
    const redirect = this.props.navigation.navigate;

    return (
      <PostListFriends redirect={redirect} tab={'Friends'} />
    );
  }
}

const styles = {
  pinStyle: {
    marginRight: 11,
    transform: [
      { scaleX: -1 }
    ]
  },
  pinnedStyle: {
    color: disabledGray,
    marginRight: 11,
    transform: [
      { scaleX: -1 }
    ]
  },
};

export default (FriendPostsScreen);
