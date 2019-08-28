import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { ListItemAsButton, Button, ButtonAsText } from '../../components/common';
import { resetNotificationsCount } from '../../api/notifications_api';
import { buttonBlue } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const FriendRequest = ({ item, navigation, currentUser, friend, actions }) => {
  const goToPublicProfile = (profileUser) => {
    actions.setFriendStatus({ status: 'See Requests' });
    navigation.navigate('Notifications_PublicProfile', {
      profileUser, navigationTab: 'Notifications' });
  };

  const acceptFriend = (profileUserId) => {
    resetNotificationsCount(currentUser.uid);
    actions.acceptFriend({ profileUserId, currentUser, friend });
  };

  const declineFriend = (profileUserId) => {
    resetNotificationsCount(currentUser.uid);
    actions.declineFriend({ profileUserId, currentUser, friend });
  };

  const {
    requestStyle,
    messageStyle,
    nameStyle,
    actionsViewStyle,
    acceptButtonStyle,
    acceptTextStyle,
    xStyle
  } = styles;

  const { name, picture, uid } = item;

  const message = () => {
    return (
      <Text style={messageStyle}>
        <Text style={nameStyle}>{name} </Text>
        requested to be friends.
      </Text>
    );
  };

  return (
    <View style={requestStyle}>
      <ListItemAsButton
        text={message()}
        imageSource={picture}
        onPress={() => goToPublicProfile(item)}
        textRestyle={{ width: SCREEN_WIDTH - 200 }}
        numberOfLines={3}
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
  requestStyle: {
    flexDirection: 'row',
    flex: 1
  },
  messageStyle: {
    fontSize: 17,
    lineHeight: 20
  },
  nameStyle: {
    fontWeight: '600'
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

export default FriendRequest;
