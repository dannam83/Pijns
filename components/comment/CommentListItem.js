import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { likeComment, getFriendStatus } from '../../actions';
import { displayTimeAgo } from '../../functions/common';
import { ActionButton, ButtonAsText } from '../../components/common';
import { lightTextGray } from '../../assets/colors';
import { addCommentLikeNotification } from '../../api/notifications';

class CommentListItem extends Component {
  state = {
    likes: this.props.comment.likeCount || 0,
    alreadyLiked: (
      this.props.postCommentLikes && this.props.postCommentLikes[this.props.comment.commentId]
    )
  };

  likeComment = () => {
    this.setState({ alreadyLiked: true });
    const { user, activePost, comment, likeComment, addCommentLikeNotification } = this.props;
    const { author, commentId } = comment;

    likeComment({
      userId: user.uid,
      userName: user.name,
      commentId,
      postAuthorId: activePost.author.id,
      postId: activePost.id,
      likesCount: comment.likes
    });

    addCommentLikeNotification(user, activePost.id, author.uid, commentId, comment.comment);
    this.setState({ likes: this.state.likes + 1 });
  };

  alreadyLiked() {
    if (this.state.alreadyLiked) {
      return true;
    }

    return false;
  }

  goToPublicProfile = () => {
    const currentUserId = this.props.user.uid;
    const profileUserId = this.props.comment.author.uid;
    const profileUser = this.props.comment.author;
    const { navigate } = this.props.navigation;
    const { navigationTab } = this.props;

    if (currentUserId === profileUserId) {
      navigate('Profile');
    } else if (this.props.friendList && this.props.friendList[profileUserId]) {
      navigate(`${navigationTab}_PublicProfile`, {
        profileUser, status: 'Unfriend', navigationTab
      });
    } else {
      this.props.getFriendStatus({ profileUserId, currentUserId });
      navigate(`${navigationTab}_PublicProfile`, { profileUser, navigationTab });
    }
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
            <Text style={likesStyle}>{likes > 0 ? likes : null}</Text>
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

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  },
  textViewStyle: {
    flex: 1,
    paddingLeft: 3,
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
    color: '#808080'
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
    height: 47,
    width: 22,
    paddingTop: 0.5,
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
};

function mapStateToProps(state) {
  const { user, activePost, postCommentLikes, friendList, navigation } = state;
  return {
    user, activePost, postCommentLikes, friendList, navigation, addCommentLikeNotification
  };
}

export default connect(mapStateToProps, { likeComment, getFriendStatus })(CommentListItem);
