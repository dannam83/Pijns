import React from 'react';
import { View, FlatList } from 'react-native';

import AllChatsListItem from './AllChatsListItem';

const AllChatsList = ({ chats, user, navigation, screenWidth }) => {
  const fontSize = screenWidth < 400 ? 16 : 17;
  const width = screenWidth - 150;

  const renderRow = (chat) => {
    if (!chat.lastMessage) { return null; }
    
    return (
      <AllChatsListItem
        chat={chat}
        user={user}
        navigation={navigation}
        screenWidth={screenWidth}
        fontSize={fontSize}
        width={width}
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
