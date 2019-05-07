import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../../components/common';
import { friendRequest, unfriend, fetchFriendList } from '../../actions';
import { disabledGray, buttonBlue } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileHeaderPersonal extends Component {
  onFriendPress = (profileUserId, status) => {
    const { currentUser } = this.props;
    if (!status) {
      this.props.friendRequest({ profileUserId, currentUser });
    } else if (status === 'See Requests') {
      this.props.navigation.navigate('Notifications');
    } else if (status === 'Unfriend') {
      this.props.unfriend({ profileUserId, currentUser });
    }
  }

  buttonStyle(status) {
    const { buttonBorderGray, buttonBodyBlue } = styles;

    switch (status) {
      case 'Requested': return buttonBorderGray;
      case 'See Requests': return buttonBodyBlue;
      case 'Unfriend': return buttonBorderGray;
      default: return {};
    }
  }

  buttonTextStyle(status) {
    const { buttonTextGray, buttonTextWhite } = styles;

    switch (status) {
      case 'Requested': return buttonTextGray;
      case 'See Requests': return buttonTextWhite;
      case 'Unfriend': return buttonTextGray;
      default: return {};
    }
  }

  disableButton(status) {
    if (status === 'Requested') {
      return true;
    }
  }

  // friendRequestButton() {
  //   return (
  //     <View style={buttonsViewStyle}>
  //       <Button
  //         onPress={() => this.onFriendPress(userId, status)}
  //         buttonRestyle={this.buttonStyle(status)}
  //         textRestyle={this.buttonTextStyle(status)}
  //         disabled={this.disableButton(status)}
  //       >{ !status ? 'Add Friend' : status }</Button>
  //
  //       <Button
  //         onPress={() => this.goToChat(userId)}
  //       >Message</Button>
  //     </View>
  //   )
  // }
  //
  // renderButtons(status) {
  //   if (!status) {
  //     return friendRequestButton();
  //   } else if (status === 'Requested') {
  //     return requestedButton();
  //   } else if (status === 'See Requests') {
  //     return goToNotificationButton();
  //   } else if (status === 'Unfriend') {
  //     return unfriendButton();
  //   }
  // }

  friendRequestButton(userId, status) {
    return (
      <Button onPress={() => this.onFriendPress(userId, status)}>
        Add Friend
      </Button>
    );
  }

  goToChat = async (userId) => {
    const { currentUser, navigation } = this.props;

    navigation.navigate('ProfileChat', {
      user: currentUser, postAuthorId: userId
    });
  }

  // <Button
  //   onPress={() => this.onFriendPress(userId, status)}
  //   buttonRestyle={this.buttonStyle(status)}
  //   textRestyle={this.buttonTextStyle(status)}
  //   disabled={this.disableButton(status)}
  //   >{ !status ? 'Add Friend' : status }</Button>
  render() {
    const { imgSource, name, userId } = this.props;

    const {
      containerStyle, imageStyle, nameStyle, buttonsViewStyle
    } = styles;

    const { status } = this.props.friend;

    return (
      <View style={containerStyle}>
        <Image source={imgSource} style={imageStyle} />
        <Text style={nameStyle}>{name}</Text>
          <View style={buttonsViewStyle}>
            {this.friendRequestButton(userId, status)}
            <Button
              onPress={() => this.goToChat(userId)}
            >Message</Button>
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
    backgroundColor: 'white',
    alignSelf: 'stretch',
    marginBottom: 5,
    width: SCREEN_WIDTH
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    alignSelf: 'stretch'
  },
  buttonBorderGray: {
    borderColor: disabledGray
  },
  buttonTextGray: {
    color: disabledGray
  },
  buttonBodyBlue: {
    borderColor: buttonBlue,
    backgroundColor: buttonBlue
  },
  buttonTextWhite: {
    color: 'white'
  }
};

function mapStateToProps(state) {
  const { user, friend } = state;
  return ({ currentUser: user, friend });
}

export default connect(mapStateToProps, {
  friendRequest, unfriend, fetchFriendList
})(ProfileHeaderPersonal);
