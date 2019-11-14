import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import { ActionButton } from '../common';
import PostCounts from './PostCounts';
import PostPrayerAnswered from './PostPrayerAnswered';
import { answerPrayer, unanswerPrayer, sendPijn, updateUserFeed } from '../../actions';
import { likePost, unlikePost } from '../../api/posts_api';
import {
  sendPijnNotification, sendPrayerAnsweredNotifications
} from '../../api/notifications_api';

class Footer extends Component {
  shouldComponentUpdate(nextProps) {
    const { notes, likes, post: { pijnSentToday, liked, answered } } = nextProps;
    const { notes: prevNotes, likes: prevLikes, post: {
      pijnSentToday: prevPijnSentToday, liked: prevLiked, answered: prevAnswered
    } } = this.props;

    return (
      notes !== prevNotes || likes !== prevLikes || liked !== prevLiked ||
      pijnSentToday !== prevPijnSentToday || answered !== prevAnswered
    );
  }

  render() {
    if (this.props.pinnedOnly && !this.props.post.pinned) {
      return null;
    }

    const {
      post, notes = 0, likes = 0, redirect,
      navigationTab, keepComments, userFeedIndex,
      updateUserFeed, sendPijn, answerPrayer, unanswerPrayer,
      post: {
        user, postId, author, navigation, index,
        pijnSentToday, commentCount = 0, answered, liked
      }
    } = this.props;

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

    const goToComments = () => {
      navigation.navigate('CommentsScreen', {
        user, postAuthorId: author.id, postId, redirect, author, index, navigationTab, keepComments
      });
    };

    const goToChat = () => {
      navigation.navigate('ChatScreen', {
        user, postAuthorId: author.id, postId, redirect, index, friend: author
      });
    };

    const goToPostNotes = () => {
      navigation.navigate('PostNotesListScreen', {
        user, postAuthorId: author.id, postId, index, navigationTab
      });
    };

    const PijnButton = () => {
      const pijnPress = () => {
        if (userFeedIndex || userFeedIndex === 0) {
          updateFeed('notes', notes + 1);
        }

        sendPijn({ postId, author, currentDate, user });
        sendPijnNotification(user, postId, post);
      };

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

    const ChatOrHandsButton = () => {
      if (author.id !== user.uid) {
        const chat = require('../../assets/images/directMessage.png');

        return <ActionButton imageSource={chat} onPress={goToChat} />;
      }

      const hands = require('../../assets/images/praise.png');

      const handsPress = () => {
        if (answered) {
          unanswerPrayer({ postId, user });
        } else {
          answerPrayer({ postId, user });
          sendPrayerAnsweredNotifications(user, postId, post);
        }
      };
      const whStyle = answered ? worshipHandsActive : worshipHandsInactive;
      return <ActionButton imageSource={hands} onPress={handsPress} iconStyle={whStyle} />;
    };

    const LikeButton = () => {
      const likePress = () => {
        if (liked) {
          unlikePost({ user, postId, authorId: author.id });
          updateFeed('likes', likes - 1);
        } else {
          likePost({ user, postId, authorId: author.id });
          updateFeed('likes', likes + 1);
        }
      };

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
