import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../components/common';
import { friendRequest } from '../actions';
import { disabledGray, buttonBlue } from '../assets/colors';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  onFriendPress = (profileUserId, status) => {
    const { currentUser } = this.props;

    if (!status) {
      this.props.friendRequest({ profileUserId, currentUser });
    } else if (status === 'See Requests') {
      this.props.navigation.navigate('Notifications');
    }
  }

  buttonStyle(status) {
    const { buttonDisabled, buttonActive } = styles;

    switch (status) {
      case 'Requested': return buttonDisabled;
      case 'See Requests': return buttonActive;
      default: return {};
    }
  }

  buttonTextStyle(status) {
    const { buttonTextDisabled, buttonTextActive } = styles;

    switch (status) {
      case 'Requested': return buttonTextDisabled;
      case 'See Requests': return buttonTextActive;
      default: return {};
    }
  }

  disableButton(status) {
    if (status === 'Requested') {
      return true;
    }
  }

  render() {
    const user = this.props.navigation.getParam('profileUser');
    const { name, picture, userId } = user;
    const {
      containerStyle, imageStyle, nameStyle, buttonsViewStyle
    } = styles;
    const { status } = this.props.friend;

    return (
      <View style={containerStyle}>
        <Image source={{ uri: `${picture}?type=large` }} style={imageStyle} />
        <Text style={nameStyle}>{name}</Text>
        <View style={buttonsViewStyle}>
          <Button
            onPress={() => this.onFriendPress(userId, status)}
            buttonRestyle={this.buttonStyle(status)}
            textRestyle={this.buttonTextStyle(status)}
            disabled={this.disableButton(status)}
          >
            { !status ? 'Add Friend' : status }
          </Button>
          <Button>Message</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingTop: 40
  },
  imageStyle: {
    borderRadius: 70,
    height: 140,
    width: 140,
    marginBottom: 20
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 35
  },
  buttonsViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDisabled: {
    borderColor: disabledGray
  },
  buttonTextDisabled: {
    color: disabledGray
  },
  buttonActive: {
    borderColor: buttonBlue,
    backgroundColor: buttonBlue
  },
  buttonTextActive: {
    color: 'white'
  },
};

function mapStateToProps(state) {
  const { user, friend } = state;
  return ({ currentUser: user, friend });
}

export default connect(mapStateToProps, {
  friendRequest
})(PublicProfileScreen);
