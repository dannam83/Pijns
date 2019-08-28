import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';

import { ActionButton } from '../common';
import { getCurrentDate } from '../../functions/common';
import PostCounts from './PostCounts';
import PostPrayerAnswered from './PostPrayerAnswered';
import { answerPrayer, unanswerPrayer, sendPijn } from '../../actions';
import {
  addPijnNotification,
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

  const [noteCount, setNoteCount] = useState(0);
  useEffect(() => {
    if (notes && notes !== noteCount) { setNoteCount(notes); }
  }, [notes]);

  const [handsActive, setHandsActive] = useState(false);
  useEffect(() => {
    if (handsActive !== worshipHandsActive) { setHandsActive(worshipHandsActive); }
  }, [worshipHandsActive]);

  const [answered, setAnswered] = useState(post.answered);
  useEffect(() => {
    if (answered !== post.answered) { setAnswered(post.answered); }
  }, [post.answered]);

  const goToComments = async () => {
    navigation.navigate(`${navigationTab}_Comments`, {
      user, postAuthorId: author.id, postId, redirect, author, index, navigationTab, keepComments
    });
  };

  const goToChat = async () => {
    navigation.navigate(`${navigationTab}_Chat`, {
      user, postAuthorId: author.id, postId, redirect, index
    });
  };

  const goToPostNotes = async () => {
    navigation.navigate(`${navigationTab}_Notes`, {
      user, postAuthorId: author.id, postId, index, navigationTab
    });
  };

  const pijnPress = () => {
    if (navigationTab === 'UserFeed') { setNoteCount(noteCount + 1); }

    sendPijn({ postId, author, currentDate, user });
    addPijnNotification(user, postId, post);
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
      const chat = require('../../assets/images/message.png');

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
        noteCount={navigationTab === 'UserFeed' ? noteCount : notes}
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

const styles = {
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
};

export default Footer;
