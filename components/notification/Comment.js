import React from 'react';
import { View, Text } from 'react-native';

import { ListItemAsButton } from '../../components/common';
import { resetNotificationsCount } from '../../api/notifications';
import { displayTimeAgoShort } from '../../functions/common';
import { timeAgoShortGray } from '../../assets/colors';
import { setActivePost } from '../../actions';

const Comment = ({ item, navigation, navigationTab, currentUser, screenWidth }) => {
  const {
    notificationStyle, messageStyle, nameStyle, contentStyle, timeViewStyle, timeStyle
  } = styles;
  const { content, postId, timestamp, sender } = item;
  const { name, picture } = sender;

  const messageIntro = 'wrote a comment:';

  const message = () => {
    return (
      <Text style={{ ...messageStyle, width: screenWidth - 111 }}>
        <Text style={nameStyle}>{name} </Text>
         {messageIntro}
        <Text style={contentStyle}> "{content}"</Text>
      </Text>
    );
  };

  const goToPost = async () => {
    resetNotificationsCount(currentUser.uid);
    const [redirect, userId] = [navigation.navigate, currentUser.uid];

    await setActivePost({ postId, postAuthor: currentUser });

    navigation.push(`${navigationTab}_Post`, {
      user: currentUser, postAuthorId: userId, postId, redirect, navigationTab
    });
  };

  return (
    <View style={notificationStyle}>
      <ListItemAsButton
        text={message()}
        imageSource={picture}
        onPress={goToPost}
        textRestyle={{ ...messageStyle, width: screenWidth - 111 }}
        numberOfLines={2}
      />
    <View style={timeViewStyle}>
        <Text style={timeStyle}>{displayTimeAgoShort(timestamp)}</Text>
      </View>
    </View>
  );
};

const styles = {
  notificationStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  messageStyle: {
    fontSize: 15
  },
  nameStyle: {
    fontWeight: '600'
  },
  contentStyle: {
    fontStyle: 'italic'
  },
  timeViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    paddingRight: 5
  },
  timeStyle: {
    paddingBottom: 2,
    fontWeight: '400',
    fontSize: 14,
    color: timeAgoShortGray
  },
};

export default Comment;
