import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';

import { ActionButton } from '../common';
import PostCounts from './PostCounts';
import PostPrayerAnswered from './PostPrayerAnswered';
import { addPijnNotification } from '../../api/notifications';

const Footer = ({ redirect, post, navigationTab, pinnedOnly, notes }) => {
  const {
    user, postId, author, navigation, index, answered, pinned, pijnSentToday
  } = post;

  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );

  const { actionsViewStyle, dividerStyle } = styles;

  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    if (notes && notes !== noteCount) { setNoteCount(notes); }
  }, [notes]);

  const goToComments = async () => {
    navigation.navigate(`${navigationTab}_Comments`, {
      user, postAuthorId: author.id, postId, redirect, author, index, navigationTab
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

  const displayNoteCount = () => {
    return (navigationTab === 'UserFeed' ? noteCount : notes);
  };

  const displayCommentCount = () => {
    return post.commentCount || 0;
  };

  const sendPijn = () => {
    if (navigationTab === 'UserFeed') {
      setNoteCount(noteCount + 1);
    }

    post.sendPijn({ postId, author, currentDate, user });
    addPijnNotification(user, postId, post);
  };

  const postActionButtons = () => {
    return (
      <View style={actionsViewStyle}>
        <ActionButton
          imageSource={require('../../assets/images/pijn.png')}
          iconStyle={{ height: 24, width: 26 }}
          onPress={() => sendPijn()}
          disabled={pijnSentToday}
        />
        <ActionButton
          imageSource={require('../../assets/images/comment.png')}
          onPress={goToComments}
        />
        <ActionButton
          imageSource={require('../../assets/images/message.png')}
          onPress={goToChat}
        />
      </View>
    );
  };

  if (pinnedOnly && !pinned) {
    return null;
  }

  return (
    <View>
      <PostCounts
        noteCount={displayNoteCount()}
        commentCount={displayCommentCount()}
        commentsPress={() => goToComments({ user, postId, author, index })}
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
      {postActionButtons()}
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
  }
};

export default Footer;
