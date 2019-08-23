import React from 'react';
import { View, Text } from 'react-native';

import { ListItemAsButton, Button, ButtonAsText } from '../../components/common';
import { resetNotificationsCount } from '../../api/notifications';
import { styles } from './notificationStyles';

const Request = ({ item, navigation, currentUser, friend, actions }) => {
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
      <Text>
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
        textRestyle={messageStyle}
        numberOfLines={2}
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

export default Request;
