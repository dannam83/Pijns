import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

import { chatTypingGray } from '../../assets/colors';
import { displayTimeAgoShort } from '../../functions/common';

const AllChatsListItem = ({ chat, user, navigation, width, fontSize, unreadCount }) => {
  const [unread, setUnread] = useState(unreadCount);

  useEffect(() => { setUnread(unreadCount); }, [unreadCount]);

  const { navigate } = navigation;
  const {
    chatId, friendName, friendPic, lastMessage, lastMessageTimestamp, lastMessageBy
  } = chat;
  const {
    rowStyle, mainViewStyle, imageStyle, timeAgoStyle, unreadStyle
  } = styles;
  const timeAgo = displayTimeAgoShort(lastMessageTimestamp);

  const goToChat = () => {
    const friendId = chatId.replace(user.uid, '');
    const friend = { id: friendId, name: friendName, picture: friendPic };

    navigation.navigate('Chats_Chat', {
      user, postAuthorId: friendId, redirect: navigate, friend
    });
  };

  const isYou = () => {
    if (lastMessageBy === user.uid) {
      return 'You: ';
    }
  };

  let nameStyle; let messageStyle;

  if (unread > 0) {
    [nameStyle, messageStyle] = [styles.nameUnreadStyle, styles.messageUnreadStyle];
  } else {
    [nameStyle, messageStyle] = [styles.nameReadStyle, styles.messageReadStyle];
  }

  return (
    <View style={{ ...rowStyle, width }}>
      <TouchableOpacity onPress={goToChat}>
        <View style={{ ...mainViewStyle }}>
          <Image
            source={{ uri: `${friendPic}?type=large` }}
            style={imageStyle}
          />
          <View style={{ paddingLeft: 14 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 1 }}>
              <Text style={{ ...nameStyle, fontSize }}>{friendName} </Text>
              <Text style={{ ...timeAgoStyle, fontSize }}>· {timeAgo}</Text>
            </View>
            <Text style={{ ...messageStyle, fontSize }} numberOfLines={1}>
              {isYou()}{lastMessage}
            </Text>
            {unread > 0 ? (
                <Text style={{ ...unreadStyle, fontSize }}>{unread} new</Text>
              ) : (
                null
              )
            }
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    paddingTop: 1,
    paddingBottom: 8
  },
  mainViewStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageStyle: {
    height: 64,
    width: 64,
    borderRadius: 32
  },
  nameReadStyle: {
  },
  nameUnreadStyle: {
    fontWeight: '600'
  },
  timeAgoStyle: {
    color: chatTypingGray
  },
  messageReadStyle: {
    color: chatTypingGray,
    paddingTop: 1
  },
  messageUnreadStyle: {
    color: 'black',
    paddingTop: 1,
    fontWeight: '600',
  },
  unreadStyle: {
    color: chatTypingGray,
    paddingTop: 1,
    fontStyle: 'italic'
  },
});

export default AllChatsListItem;
