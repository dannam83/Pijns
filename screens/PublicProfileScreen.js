import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../components/common';
import { friendRequest } from '../actions';
import { disabledGray } from '../assets/colors';

class PublicProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  onFriendPress = (profileUserId) => {
    const { currentUser } = this.props;
    this.props.friendRequest({ profileUserId, currentUser });
  }

  buttonStyle(status) {
    const { buttonDisabled } = styles;

    if (status === 'Requested') {
      return buttonDisabled;
    }
  }

  buttonTextStyle(status) {
    const { buttonTextDisabled } = styles;

    if (status === 'Requested') {
      return buttonTextDisabled;
    }
  }

  disableButton(status) {
    if (status === 'Requested') {
      return true;
    }
  }

  render() {
    console.log(this.props);
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
            onPress={() => this.onFriendPress(userId)}
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
};

function mapStateToProps(state) {
  const { user, friend } = state;
  return ({ currentUser: user, friend });
}

export default connect(mapStateToProps, {
  friendRequest
})(PublicProfileScreen);
