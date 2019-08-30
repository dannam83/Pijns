import React from 'react';
import { View, FlatList, Text } from 'react-native';

import { ListItemAsButton } from '../../components/common';
// import ChatDay from './ChatDay';

const AllChatsListItem = ({ chat, user, navigation, screenWidth }) => {
  const { navigate } = navigation;
  const { chatId, friendName, friendPic } = chat;

  const goToChat = () => {
    const friendId = chatId.replace(user.uid, '');
    const friend = { id: friendId, name: friendName, picture: friendPic };

    navigation.navigate('Chats_Chat', {
      user, postAuthorId: friendId, redirect: navigate, friend
    });
  };

  return (
    <View style={styles.chatStyle}>
      <ListItemAsButton
        text={friendName}
        imageSource={friendPic}
        onPress={(chat) => goToChat(chat)}
        numberOfLines={2}
      />
    </View>
  );
};

const styles = {
  chatStyle: {
    flexDirection: 'row',
  },
  // messageStyle: {
  //   fontSize: 16,
  //   width: SCREEN_WIDTH - 120
  // },
  // timeViewStyle: {
  //   flexDirection: 'row',
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   paddingBottom: 10,
  //   paddingRight: 5
  // },
  // timeStyle: {
  //   paddingBottom: 2,
  //   fontWeight: '400',
  //   fontSize: 14,
  //   color: timeAgoShortGray
  // },
};

export default AllChatsListItem;
