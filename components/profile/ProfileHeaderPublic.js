import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../../components/common';
import { friendRequest, unfriend, fetchFriendList } from '../../actions';
import { disabledGray, buttonBlue } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileHeaderPersonal extends Component {
  friendRequestButton(profileUserId, currentUser) {
    return (
      <Button
        onPress={() => this.props.friendRequest({ profileUserId, currentUser })}
      >
        Add Friend
      </Button>
    );
  }

  requestedButton() {
    const { buttonBorderGray, buttonTextGray } = styles;

    return (
      <Button
        buttonRestyle={buttonBorderGray}
        textRestyle={buttonTextGray}
        disabled
      >
        Requested
      </Button>
    );
  }

  unfriendButton(profileUserId, currentUser) {
    const { buttonBorderGray, buttonTextGray } = styles;

    return (
      <Button
        onPress={() => this.props.unfriend({ profileUserId, currentUser })}
        buttonRestyle={buttonBorderGray}
        textRestyle={buttonTextGray}
      >
        Unfriend
      </Button>
    );
  }

  seeRequestsButton() {
    const { buttonBodyBlue, buttonTextWhite } = styles;

    return (
      <Button
        onPress={() => this.props.redirect('Notifications')}
        buttonRestyle={buttonBodyBlue}
        textRestyle={buttonTextWhite}
      >
        See Requests
      </Button>
    );
  }

  chatButton(userId) {
    const { currentUser, redirect } = this.props;

    redirect('ProfileChat', {
      user: currentUser, postAuthorId: userId
    });
  }

  renderFriendButtons(userId, status) {
    const { currentUser } = this.props;

    if (!status) {
      return this.friendRequestButton(userId, currentUser);
    } else if (status === 'Requested') {
      return this.requestedButton();
    } else if (status === 'See Requests') {
      return this.seeRequestsButton();
    } else if (status === 'Unfriend') {
      return this.unfriendButton(userId, currentUser);
    }
  }

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
            {this.renderFriendButtons(userId, status)}
            <Button
              onPress={() => this.chatButton(userId)}
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
    // alignSelf: 'stretch',
    paddingTop: 40,
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
