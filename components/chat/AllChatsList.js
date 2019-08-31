import React from 'react';
import { View, FlatList } from 'react-native';

import AllChatsListItem from './AllChatsListItem';

const AllChatsList = ({ chats, user, navigation, screenWidth }) => {
  const renderRow = (chat) => {
    return (
      <AllChatsListItem
        chat={chat}
        user={user}
        navigation={navigation}
        screenWidth={screenWidth}
        unreadCount={chat.unread}
      />
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

export default AllChatsList;
