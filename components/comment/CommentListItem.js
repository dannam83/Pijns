import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { likeComment, getFriendStatus } from '../../actions';
import { displayTimeAgo } from '../../functions/common';
import { ActionButton, ButtonAsText } from '../../components/common';
import { lightTextGray } from '../../assets/colors';
import { sendCommentLikeNotification } from '../../api/notifications_api';

class CommentListItem extends Component {
  state = {
    likes: this.props.comment.likeCount || 0,
    alreadyLiked: (
      this.props.postCommentLikes && this.props.postCommentLikes[this.props.comment.commentId]
    )
  };

  likeComment = () => {
    this.setState({ alreadyLiked: true });
    const { user, activePost, comment, likeComment, sendCommentLikeNotification } = this.props;
    const { author, commentId } = comment;

    likeComment({
      userId: user.uid,
      user,
      commentId,
      postAuthorId: activePost.author.id,
      postId: activePost.id,
      likesCount: comment.likes
    });

    sendCommentLikeNotification(user, activePost.id, author.uid, commentId, comment.comment);
    this.setState({ likes: this.state.likes + 1 });
  };

  alreadyLiked() {
    if (this.state.alreadyLiked) {
      return true;
    }

    return false;
  }

  goToPublicProfile = () => {
    const {
      user: { uid: currentUserId },
      comment: { author: profileUser, author: { uid: profileUserId } },
      navigation: { navigate },
    } = this.props;

    if (currentUserId === profileUserId) {
      navigate('Profile');
    } else if (this.props.friendList && this.props.friendList[profileUserId]) {
      navigate('PublicProfileScreen', { profileUser, status: 'Unfriend' });
    } else {
      this.props.getFriendStatus({ profileUserId, currentUserId });
      navigate('PublicProfileScreen', { profileUser });
    }
  };

  goToCommentLikes = () => {
    const { navigation, comment: { commentId } } = this.props;

    navigation.navigate('CommentLikesScreen', { commentId });
  };

  render() {
    const {
      author,
      comment,
      timestamp,
      createdOn
    } = this.props.comment;

    const {
      containerStyle,
      thumbnailStyle,
      textViewStyle,
      commentHeaderStyle,
      commentHeaderFrontStyle,
      timeAgoStyle,
      nameStyle,
      likesStyle,
      commentStyle,
      buttonStyle,
      iconNotLikedStyle,
      iconLikedStyle,
    } = styles;

    const { likes } = this.state;
    const { name, picture } = author;
    const iconStyle = this.alreadyLiked() ? iconLikedStyle : iconNotLikedStyle;
    const timeAgo = displayTimeAgo(timestamp, createdOn);

    return (
      <View style={containerStyle}>
        <ActionButton
          iconStyle={thumbnailStyle}
          imageSource={{ uri: picture }}
          onPress={this.goToPublicProfile}
        />
        <View style={textViewStyle}>
          <View style={commentHeaderStyle}>
            <View style={commentHeaderFrontStyle}>
              <ButtonAsText
                editTextStyle={nameStyle}
                editButtonStyle={{ paddingRight: 8 }}
                onPress={this.goToPublicProfile}
              >
                {name}
              </ButtonAsText>
              <Text style={timeAgoStyle}>{timeAgo}</Text>
            </View>
            <TouchableOpacity onPress={this.goToCommentLikes}>
              <Text style={likesStyle}>{likes > 0 ? likes : null}</Text>
            </TouchableOpacity>
          </View>
          <Text style={commentStyle}>{comment}</Text>
        </View>
        <ActionButton
          imageSource={require('../../assets/images/heart.png')}
          buttonStyle={buttonStyle}
          iconStyle={iconStyle}
          onPress={this.likeComment}
          disabled={this.alreadyLiked()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  textViewStyle: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 5
  },
  commentHeaderStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentHeaderFrontStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 1,
  },
  nameStyle: {
    fontWeight: '700',
    fontSize: 16
  },
  timeAgoStyle: {
    color: lightTextGray,
    marginBottom: 2.5,
  },
  likesStyle: {
    paddingTop: 0.5,
    fontStyle: 'italic',
    color: '#808080',
    paddingLeft: 20
  },
  commentStyle: {
    color: '#000',
    fontSize: 16,
    lineHeight: 20,
  },
  thumbnailStyle: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 8,
  },
  buttonStyle: {
    height: 27,
    width: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconNotLikedStyle: {
    height: 17,
    width: 17,
    tintColor: '#D3D3D3'
  },
  iconLikedStyle: {
    height: 17,
    width: 17,
    tintColor: '#FF0000'
  },
});

function mapStateToProps(state) {
  const { user, activePost, postCommentLikes, friendList } = state;
  return {
    user, activePost, postCommentLikes, friendList, sendCommentLikeNotification
  };
}

export default withNavigation(
  connect(mapStateToProps, { likeComment, getFriendStatus })(CommentListItem)
);
