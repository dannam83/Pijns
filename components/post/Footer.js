import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import { ActionButton } from '../common';
import PostCounts from './PostCounts';
import PostPrayerAnswered from './PostPrayerAnswered';
import { answerPrayer, unanswerPrayer, sendPijn, updateUserFeed } from '../../actions';
import { likePost, unlikePost } from '../../api/posts_api';
import { favoritePost, unfavoritePost } from '../../api/user_favorites_api';
import {
  sendPijnNotification, sendPrayerAnsweredNotifications
} from '../../api/notifications_api';

class Footer extends Component {
  shouldComponentUpdate(nextProps) {
    const { notes, likes,
      post: { pijnSentToday, liked, favorite, answered, commentCount } } = nextProps;
    const { notes: prevNotes, likes: prevLikes, post: {
      pijnSentToday: prevPijnSentToday,
      liked: prevLiked,
      favorite: prevFavorite,
      answered: prevAnswered,
      commentCount: prevCommentCount,
    } } = this.props;
    return (
      notes !== prevNotes || likes !== prevLikes || favorite !== prevFavorite,
      liked !== prevLiked || pijnSentToday !== prevPijnSentToday ||
      answered !== prevAnswered || commentCount !== prevCommentCount
    );
  }

  render() {
    if (this.props.pinnedOnly && !this.props.post.pinned) {
      return null;
    }

    const {
      post, notes = 0, likes = 0,
      redirect, navigation, userFeedIndex,
      updateUserFeed, sendPijn, answerPrayer, unanswerPrayer,
      post: {
        user, postId, author, index, pijnSentToday,
        commentCount = 0, answered, liked, favorite,
      }
    } = this.props;

    const currentDate = new Date(
      new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
    );

    const { actionsViewStyle, dividerStyle, worshipHandsActive, worshipHandsInactive
    } = styles;

    const goToPostNotes = () => {
      navigation.navigate('PostNotesListScreen', {
        user, postAuthorId: author.id, postId, index
      });
    };

    const goToChat = () => {
      navigation.navigate('ChatScreen', {
        user, postAuthorId: author.id, postId, redirect, index, friend: author
      });
    };

    const goToComments = () => {
      navigation.push('CommentsScreen', {
        user, postAuthorId: author.id, postId, redirect, author, index
      });
    };

    const goToLikes = () => {
      navigation.push('PostLikesScreen', {
        user, postAuthorId: author.id, postId, redirect, author, index,
      });
    };

    const PijnButton = () => {
      const pijnPress = () => {
        updateUserFeed(userFeedIndex, 'notes', notes + 1);
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

    const FavoriteButton = () => {
      const favoritePress = () => {
        if (favorite) {
          unfavoritePost({ user, postId });
        } else {
          favoritePost({ user, postId });
        }
      };

      return (
        <TouchableOpacity style={{ paddingTop: 3 }} onPress={favoritePress}>
          {
            favorite
            ?
            <TouchableOpacity style={{ paddingTop: 3 }}>
                <AntDesign
                  name={'star'}
                  size={19}
                  color={'#EEE006'}
                />
            </TouchableOpacity>
            :
            <AntDesign
                name={'staro'}
                size={19}
                color={'#434343'}
            />
          }
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
          unanswerPrayer({ postId, user, userFeedIndex });
        } else {
          answerPrayer({ postId, user, userFeedIndex });
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
          updateUserFeed(userFeedIndex, 'likes', likes - 1);
        } else {
          likePost({ user, postId, authorId: author.id });
          updateUserFeed(userFeedIndex, 'likes', likes + 1);
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
          notesPress={goToPostNotes}
          commentCount={commentCount}
          commentsPress={goToComments}
          likeCount={likes}
          likesPress={goToLikes}
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
          <FavoriteButton />
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

export default withNavigation(connect(null, {
  answerPrayer, unanswerPrayer, sendPijn, updateUserFeed
})(Footer));
