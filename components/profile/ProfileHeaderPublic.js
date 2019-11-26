import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../../components/common';
import { friendRequest, unfriend, fetchFriendList } from '../../actions';
import { disabledGray, buttonBlue } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileHeaderPublic extends Component {
  constructor(props) {
    super(props);
    let status = this.props.status;
    if (!status) { status = this.props.friend.status; }
    this.state = {
      unfriend: 'Unfriend',
      status,
      friendStatus: status,
    };
  }

  chatPress() {
    const { currentUser, redirect, friend } = this.props;
    const { uid } = friend;
    redirect('ChatScreen', {
      user: currentUser, postAuthorId: uid, friendId: uid, friend
    });
  }

  render() {
    const FriendingButton = () => {
      const { currentUser, friendRequest, unfriend, profileId } = this.props;
      const { friendStatus } = this.state;
      const { buttonBodyBlue, buttonTextWhite, buttonBorderGray, buttonTextGray } = styles;
      const { redirect } = this.props;

      let oP; let bS; let tS; let d;

      [oP, bS, tS, d] = !friendStatus
        ? [() => friendRequest({ profileUserId: profileId, currentUser })]
        : friendStatus === 'Requested'
          ? [null, buttonBorderGray, buttonTextGray, true]
          : friendStatus === 'See Requests'
            ? [() => redirect('Notifications'), buttonBodyBlue, buttonTextWhite]
            : [
                () => unfriend({ profileUserId: profileId, currentUser }),
                buttonBorderGray,
                buttonTextGray
              ];

      return (
        <Button
          onPress={oP}
          buttonRestyle={bS}
          textRestyle={tS}
          disabled={d}
        >
          {friendStatus || 'Add Friend'}
        </Button>
      );
    };

    const { imgSource, name } = this.props;

    const {
      containerStyle, imageStyle, nameStyle, buttonsViewStyle
    } = styles;

    let status = this.props.status;
    if (!status) { status = this.props.friend.status; }

    return (
      <View style={containerStyle}>
        <Image source={imgSource} style={imageStyle} />
        <Text style={nameStyle}>{name}</Text>
          <View style={buttonsViewStyle}>
            <FriendingButton />
            <Button
              onPress={() => this.chatPress()}
            >Message</Button>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
});

function mapStateToProps(state) {
  console.log(state.friend.status)
  return ({ currentUser: state.user });
}

export default connect(mapStateToProps, {
  friendRequest, unfriend, fetchFriendList
})(ProfileHeaderPublic);
