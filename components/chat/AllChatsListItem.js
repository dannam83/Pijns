import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import { chatTypingGray } from '../../assets/colors';
import { displayTimeAgoShort } from '../../functions/common';

const AllChatsListItem = ({ chat, user, navigation, screenWidth, unreadCount }) => {
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
    <View style={{ ...rowStyle, width: screenWidth - 150 }}>
      <TouchableOpacity onPress={goToChat}>
        <View style={mainViewStyle}>
          <Image
            source={{ uri: `${friendPic}?type=large` }}
            style={imageStyle}
          />
          <View style={{ paddingLeft: 14 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 1 }}>
              <Text style={nameStyle}>{friendName} </Text>
              <Text style={timeAgoStyle}>· {timeAgo}</Text>
            </View>
            <Text style={messageStyle} numberOfLines={1}>
              {isYou()}{lastMessage}
            </Text>
            {unread > 0 ? (
                <Text style={unreadStyle}>{unread} new</Text>
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

const styles = {
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
    fontSize: 17
  },
  nameUnreadStyle: {
    fontSize: 17,
    fontWeight: '500'
  },
  timeAgoStyle: {
    fontSize: 17,
    color: chatTypingGray
  },
  messageReadStyle: {
    fontSize: 17,
    color: chatTypingGray,
    paddingTop: 1
  },
  messageUnreadStyle: {
    fontSize: 17,
    color: 'black',
    paddingTop: 1,
    fontWeight: '500',
  },
  unreadStyle: {
    fontSize: 17,
    color: chatTypingGray,
    paddingTop: 1,
    fontStyle: 'italic'
  },
};
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
// };

export default AllChatsListItem;
