import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import { likeComment } from '../../actions';
import { ActionButton } from '../../components/common';

class CommentListItem extends Component {
  state = {
    likes: this.props.comment.likes || 0,
    alreadyLiked: this.props.comment.likedBy && this.props.comment.likedBy[this.props.user.uid]
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
    console.log('likes', this.likes);
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
      createdOn,
      navigation
    } = this.props.comment;
    console.log(this.props);

    const {
      containerStyle,
      thumbnailStyle,
      textViewStyle,
      commentHeaderStyle,
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

    return (
      <View style={containerStyle}>
        <Image
          style={thumbnailStyle}
          source={{ uri: picture }}
        />
        <View style={textViewStyle}>
          <View style={commentHeaderStyle}>
            <Text style={nameStyle}>{name}</Text>
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
// disabled={alreadyLiked}
// <TouchableOpacity style={buttonStyle}>
// <Text style={buttonTextStyle} onPress={this.saveComment}>Post</Text>
// </TouchableOpacity>

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
    paddingRight: 5,
  },
  commentHeaderStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameStyle: {
    fontWeight: '700',
    marginBottom: 1
  },
  likesStyle: {
    marginBottom: 1,
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
  const { user, activePost } = state;
  return { user, activePost };
}

export default connect(mapStateToProps, { likeComment })(CommentListItem);
