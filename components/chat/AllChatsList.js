import React from 'react';
import { View, FlatList, Text } from 'react-native';

import { ListItemAsButton } from '../../components/common';
// import ChatDay from './ChatDay';

const AllChatsList = ({ chats }) => {
  const renderRow = (chat) => {
    const { friendName, friendPic } = chat;
    return (
      <View style={styles.chatStyle}>
        <ListItemAsButton
          text={friendName}
          imageSource={friendPic}

          numberOfLines={2}
        />
      </View>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={chats}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={({ item }, date) => date.toString()}
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

export default AllChatsList;
