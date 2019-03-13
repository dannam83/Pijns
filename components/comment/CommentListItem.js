import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import { likeComment } from '../../actions';
import { displayTimeAgo } from '../../functions/common';
import { ActionButton } from '../../components/common';
import { lightTextGray } from '../../assets/colors';

class CommentListItem extends Component {
  state = {
    likes: this.props.comment.likeCount || 0,
    alreadyLiked: (
      this.props.postCommentLikes && this.props.postCommentLikes[this.props.comment.commentId]
    )
  };

  likeComment = () => {
    this.setState({ alreadyLiked: true });
    const { user, activePost, comment } = this.props;
    this.props.likeComment({
      userId: user.uid,
      userName: user.name,
      commentId: comment.commentId,
      postAuthorId: activePost.author.id,
      postId: activePost.id,
      likesCount: comment.likes
    });

    this.setState({ likes: this.state.likes + 1 });
  };

  alreadyLiked() {
    if (this.state.alreadyLiked) {
      return true;
    }

    return false;
  }

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
        <Image
          style={thumbnailStyle}
          source={{ uri: picture }}
        />
        <View style={textViewStyle}>
          <View style={commentHeaderStyle}>
            <View style={commentHeaderFrontStyle}>
              <Text style={nameStyle}>{name}</Text>
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
    paddingLeft: 5,
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
    paddingLeft: 8,
    marginBottom: 1.5,
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
    height: 47,
    width: 47,
    borderRadius: 25,
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
  const { user, activePost, postCommentLikes } = state;
  return { user, activePost, postCommentLikes };
}

export default connect(mapStateToProps, { likeComment })(CommentListItem);
