import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import { ActionButton } from '../common';
// import { getCurrentDate } from '../../functions/common';
import PostCounts from './PostCounts';
import PostPrayerAnswered from './PostPrayerAnswered';
import { answerPrayer, unanswerPrayer, sendPijn, updateUserFeed } from '../../actions';
import {
  sendPijnNotification,
  sendPrayerAnsweredNotifications
} from '../../api/notifications_api';
import { likePost, unlikePost } from '../../api/posts_api';

class Footer extends Component {
  shouldComponentUpdate(nextProps) {
    const { notes, likes, post: { pijnSentToday, liked, answered } } = nextProps;
    const {
      notes: prevNotes,
      likes: prevLikes,
      post: { pijnSentToday: prevPijnSentToday, liked: prevLiked, answered: prevAnswered },
    } = this.props;
    return (
      notes !== prevNotes || likes !== prevLikes || liked !== prevLiked ||
      pijnSentToday !== prevPijnSentToday || answered !== prevAnswered
    );
  }

  render() {
  const {
    post, notes = 0, pinnedOnly, redirect, navigationTab,
    keepComments, likes = 0, userFeedIndex, updateUserFeed,
    sendPijn, answerPrayer, unanswerPrayer,
  } = this.props;
  const {
    user, postId, author, navigation, index, pinned,
    pijnSentToday, commentCount = 0, answered, liked
  } = post;
  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );
  const { actionsViewStyle, dividerStyle, worshipHandsActive, worshipHandsInactive
  } = styles;

  const updateFeed = (field, value) => {
    if (userFeedIndex || userFeedIndex === 0) {
      updateUserFeed(userFeedIndex, field, value);
    }
  };

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
    if (userFeedIndex || userFeedIndex === 0) {
      updateFeed('notes', notes + 1);
    }

    sendPijn({ postId, author, currentDate, user });
    sendPijnNotification(user, postId, post);
  };

  const PijnButton = () => {
    return (
      <ActionButton
        imageSource={require('../../assets/images/pijn.png')}
        iconStyle={{ height: 20, width: 22 }}
        onPress={() => pijnPress()}
        disabled={pijnSentToday}
      />
    );
  };

  const StarButton = () => {
    return (
      <TouchableOpacity style={{ paddingTop: 3 }}>
        <AntDesign
          name={'staro'}
          size={19}
          color={'#434343'}
        />
      </TouchableOpacity>
    );
  };

  const CommentButton = () => {
    return (
      <TouchableOpacity style={{ paddingTop: 4 }} onPress={goToComments}>
        <AntDesign
          name={'message1'}
          size={17}
          color={'#454545'}
        />
      </TouchableOpacity>
    );
  };

  const handsPress = () => {
    if (answered) {
      unanswerPrayer({ postId, user });
    } else {
      answerPrayer({ postId, user });
      sendPrayerAnsweredNotifications(user, postId, post);
    }
  };

  const ChatOrHandsButton = () => {
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

  const likePress = () => {
    let newCount;
    if (liked) {
      newCount = likes - 1;
      unlikePost({ user, postId, authorId: post.author.id });
    } else {
      newCount = likes + 1;
      likePost({ user, postId, authorId: post.author.id });
    }

    updateFeed('likes', newCount);
  };

  const LikeButton = () => {
    return (
      !liked ? (
        <TouchableOpacity style={{ paddingTop: 4 }} onPress={likePress}>
          <AntDesign
            name={'hearto'}
            size={18}
            color={'#454545'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{ paddingTop: 4 }} onPress={likePress}>
          <AntDesign
            name={'heart'}
            size={18}
            color={'red'}
          />
        </TouchableOpacity>
      )
    );
  };

  return (
    <View>
      <PostCounts
        noteCount={notes}
        commentCount={commentCount}
        likeCount={likes}
        commentsPress={goToComments}
        notesPress={goToPostNotes}
      />

      {answered ? (
        <View>
          <Divider style={dividerStyle} />
          <PostPrayerAnswered date={answered} />
          <Divider style={[dividerStyle, { marginTop: 10 }]} />
        </View>
      ) : (
        <Divider style={dividerStyle} />
      )}

      <View style={actionsViewStyle}>
        <PijnButton />
        <StarButton />
        <ChatOrHandsButton />
        <CommentButton />
        <LikeButton />
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: '#D3D3D3',
    marginTop: 3,
    marginBottom: 10
  },
  actionsViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35
  },
  worshipHandsInactive: {
    height: 21,
    width: 24,
    marginLeft: -1.5,
  },
  worshipHandsActive: {
    height: 21,
    width: 24,
    marginLeft: -1.5,
    tintColor: '#50C35C'
  },
});

export default connect(null, {
  answerPrayer, unanswerPrayer, sendPijn, updateUserFeed
})(Footer);
