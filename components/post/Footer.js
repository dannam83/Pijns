import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

import { ActionButton } from '../common';
import { getCurrentDate } from '../../functions/common';
import PostCounts from './PostCounts';
import PostPrayerAnswered from './PostPrayerAnswered';
import { answerPrayer, unanswerPrayer, sendPijn } from '../../actions';
import {
  sendPijnNotification,
  sendPrayerAnsweredNotifications
} from '../../api/notifications_api';

const Footer = ({ post, notes, pinnedOnly, redirect, navigationTab, keepComments }) => {
  const {
    user, postId, author, navigation, index, pinned, pijnSentToday
  } = post;
  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );
  const { actionsViewStyle, dividerStyle, worshipHandsActive, worshipHandsInactive } = styles;

  const [noteCount, setNoteCount] = useState(notes || 0);
  const [handsActive, setHandsActive] = useState(false);
  const [answered, setAnswered] = useState(post.answered);

  useEffect(() => {
    if (notes !== noteCount) { setNoteCount(notes || 0); }
  }, [notes]);
  useEffect(() => {
    if (handsActive !== worshipHandsActive) { setHandsActive(worshipHandsActive); }
  }, [worshipHandsActive]);
  useEffect(() => {
    if (answered !== post.answered) { setAnswered(post.answered); }
  }, [post.answered]);

  const goToComments = async () => {
    navigation.navigate('CommentsScreen', {
      user, postAuthorId: author.id, postId, redirect, author, index, navigationTab, keepComments
    });
  };

  const goToChat = async () => {
    navigation.navigate('ChatScreen', {
      user, postAuthorId: author.id, postId, redirect, index, friend: author
    });
  };

  const goToPostNotes = async () => {
    navigation.navigate('PostNotesListScreen', {
      user, postAuthorId: author.id, postId, index, navigationTab
    });
  };

  const pijnPress = () => {
    if (navigationTab === 'UserFeed') { setNoteCount(noteCount + 1); }

    sendPijn({ postId, author, currentDate, user });
    sendPijnNotification(user, postId, post);
  };

  const handsPress = () => {
    setHandsActive(!handsActive);
    if (answered) {
      setAnswered(false); unanswerPrayer({ postId, user });
    } else {
      setAnswered(getCurrentDate()); answerPrayer({ postId, user });
      sendPrayerAnsweredNotifications(user, postId, post);
    }
  };

  const pijnButton = () => {
    return (
      <ActionButton
        imageSource={require('../../assets/images/pijn.png')}
        iconStyle={{ height: 24, width: 26 }}
        onPress={() => pijnPress()}
        disabled={pijnSentToday}
      />
    );
  };

  const commentButton = () => {
    return (
      <ActionButton
        imageSource={require('../../assets/images/comment.png')}
        onPress={goToComments}
      />
    );
  };

  const chatOrHandsButton = () => {
    if (author.id !== user.uid) {
      const chat = require('../../assets/images/directMessage.png');

      return <ActionButton imageSource={chat} onPress={goToChat} />;
    }

    const whStyle = answered ? worshipHandsActive : worshipHandsInactive;
    const hands = require('../../assets/images/praise.png');

    return <ActionButton imageSource={hands} onPress={handsPress} iconStyle={whStyle} />;
  };

  if (pinnedOnly && !pinned) {
    return null;
  }

  return (
    <View>
      <PostCounts
        noteCount={noteCount || 0}
        commentCount={post.commentCount || 0}
        commentsPress={goToComments}
        notesPress={goToPostNotes}
      />

      {answered ? (
        <View>
          <Divider style={dividerStyle} />
          <PostPrayerAnswered date={answered} />
          <Divider style={dividerStyle} />
        </View>
      ) : (
        <Divider style={dividerStyle} />
      )}

      <View style={actionsViewStyle}>
        {pijnButton()}
        {commentButton()}
        {chatOrHandsButton()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: '#D3D3D3',
    marginTop: 10,
    marginBottom: 10
  },
  actionsViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 60,
    paddingRight: 60
  },
  worshipHandsInactive: {
    height: 24,
    width: 27,
    marginLeft: -1.5,
  },
  worshipHandsActive: {
    height: 24,
    width: 27,
    marginLeft: -1.5,
    tintColor: '#50C35C'
  },
});

export default Footer;
