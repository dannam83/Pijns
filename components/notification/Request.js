import React from 'react';
import { View } from 'react-native';

import { ListItemAsButton, Button, ButtonAsText } from '../../components/common';
import { buttonBlue } from '../../assets/colors';

const Request = ({ item, navigation, currentUser, friend, actions }) => {
  const goToPublicProfile = (profileUser) => {
    actions.setFriendStatus({ status: 'See Requests' });
    navigation.navigate('Notifications_PublicProfile', {
      profileUser, navigationTab: 'Notifications' });
  };

  const acceptFriend = (profileUserId) => {
    actions.acceptFriend({ profileUserId, currentUser, friend });
  };

  const declineFriend = (profileUserId) => {
    actions.declineFriend({ profileUserId, currentUser, friend });
  };

  const {
    requestStyle, actionsViewStyle, acceptButtonStyle, acceptTextStyle, xStyle
  } = styles;
  
  const { name, picture, uid } = item;

  return (
    <View style={requestStyle}>
      <ListItemAsButton
        text={name}
        imageSource={picture}
        onPress={() => goToPublicProfile(item)}
      />
      <View style={actionsViewStyle}>
        <Button
          buttonRestyle={acceptButtonStyle}
          textRestyle={acceptTextStyle}
          onPress={() => acceptFriend(uid)}
        >Accept</Button>
        <ButtonAsText
          editTextStyle={xStyle}
          onPress={() => declineFriend(uid)}
        >x</ButtonAsText>
      </View>
    </View>
  );
};

const styles = {
  masterContainerStyle: {
    padding: 10,
  },
  requestStyle: {
    flexDirection: 'row',
  },
  actionsViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  acceptButtonStyle: {
    width: 75,
    height: 25,
    backgroundColor: buttonBlue,
    borderColor: buttonBlue,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 17
  },
  acceptTextStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  },
  xStyle: {
    paddingBottom: 2,
    fontWeight: '700',
    fontSize: 14
  },
};

export default Request;
