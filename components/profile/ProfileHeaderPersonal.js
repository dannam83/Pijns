import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Button } from '../../components/common';

const ProfileHeaderPersonal = (props) => {
  const { imgSource, name, logout, fetchFriendList, userId, navigation } = props;

  const onFriendsPress = () => {
    fetchFriendList(userId);
    navigation.navigate('Profile_FriendList');
  };

  const {
    containerStyle, imageStyle, nameStyle, buttonsViewStyle
  } = styles;

  return (
    <View style={containerStyle}>
      <Image source={imgSource} style={imageStyle} />

      <Text style={nameStyle}>{name}</Text>

      <View style={buttonsViewStyle}>
        <Button
          onPress={() => onFriendsPress()}
        >Friends
        </Button>

        <Button
          onPress={() => logout(navigation.navigate)}
        >Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#ffff',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 5
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
    paddingBottom: 20
  }
});

export default ProfileHeaderPersonal;
