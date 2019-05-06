import React from 'react';
import { View, Text, Image } from 'react-native';

import { Button } from '../../components/common';

const ProfileHeaderPersonal = (props) => {
  const onFriendsPress = (redirect) => {
    const { fetchFriendList, userId, tab } = props;
    fetchFriendList(userId);
    redirect(tab);
  };

  const { imgSource, name, redirect, logout } = props;

  const {
    containerStyle, imageStyle, nameStyle, buttonsViewStyle
  } = styles;

  return (
    <View style={containerStyle}>
      <Image source={imgSource} style={imageStyle} />

      <Text style={nameStyle}>{name}</Text>

      <View style={buttonsViewStyle}>
        <Button
          onPress={() => onFriendsPress(redirect)}
        >Friends
        </Button>

        <Button
          onPress={() => logout(redirect)}
        >Logout
        </Button>
      </View>
    </View>
  );
};

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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  }
};

export default ProfileHeaderPersonal;
