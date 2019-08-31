import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import { chatTypingGray } from '../../assets/colors';
import { displayTimeAgoShort } from '../../functions/common';

const AllChatsListItem = ({ chat, user, navigation, screenWidth }) => {
  const { navigate } = navigation;
  const {
    chatId, friendName, friendPic, lastMessage, lastMessageTimestamp, lastMessageBy
  } = chat;
  const {
    rowStyle, mainViewStyle, imageStyle, nameStyle, timeAgoStyle, messageStyle
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

  return (
    <View style={rowStyle}>
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
    alignItems: 'center',
  },
  imageStyle: {
    height: 64,
    width: 64,
    borderRadius: 32
  },
  nameStyle: {
    fontSize: 17
  },
  timeAgoStyle: {
    fontSize: 17,
    color: chatTypingGray
  },
  messageStyle: {
    fontSize: 17,
    color: chatTypingGray,
    paddingTop: 1
  }
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
