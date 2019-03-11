import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements';

import { CardBanner, ActionButton } from '../common';
import PostCounts from './PostCounts';
import {
  postEditUpdate,
  commentsPopulate,
  fetchPostCommentLikes,
  setActivePost,
  answerPrayer
} from '../../actions';

class PostListItem extends Component {
  state = {
    noteCount: this.props.post.notes ? this.props.post.notes.count : 0,
    commentCount: this.props.post.commentCount || 0,
    answered: this.props.post.answered ? this.props.post.answered : null
  }

  goToComments = async () => {
    const { redirect, redirectTo, post } = this.props;
    const { user, postId, author, index, navigation } = post;

    await this.props.fetchPostCommentLikes({ userId: user.uid, postId });
    await this.props.commentsPopulate(postId);
    await this.props.setActivePost({ postId, postAuthor: author });

    navigation.navigate(redirectTo, {
      user, postAuthorId: author.id, postId, redirect, index
    });
  };

  goToPostNotes = async () => {
    const { tab, post } = this.props;
    const postList = tab === 'Friends' ? 'FriendPostNotes' : 'MyPostNotes';
    const { user, postId, author, index } = post;

    post.navigation.navigate(postList, {
      user, postAuthorId: author.id, postId, index, tab
    });
  };

  displayNoteCount = () => {
    const { post, tab } = this.props;
    const { notes } = post;
    const noteCount = notes ? notes.count : 0;
    return (
      tab === 'Friends' ? this.state.noteCount : noteCount
    );
  }

  displayCommentCount = () => {
    const { post, tab } = this.props;
    const { commentCount } = post;
    let displayCommentCount;

    if (tab === 'Friends') {
      displayCommentCount = this.state.commentCount;
    }
    if (tab === 'My') {
      displayCommentCount = !commentCount ? 0 : commentCount;
    }

    return displayCommentCount;
  }

  sendPijn = ({ postId, author, currentDate, user }) => {
    const { tab } = this.props;

    if (tab === 'Friends') {
      this.setState({ noteCount: this.state.noteCount + 1 });
    }

    this.props.post.sendPijn({ postId, author, currentDate, user });
  }

  worshipHandsPress = ({ postId, user }) => {
    if (this.state.answered) {
      return;
    }

    this.setState({ answered: true });

    this.props.answerPrayer({ postId, user });
  }

  postActionButtons({ postId, author, currentDate, user }) {
    const { pijnSentToday } = this.props.post;
    const { actionsViewStyle, worshipHandsInactive, worshipHandsActive } = styles;
    const whStyle = this.state.answered ? worshipHandsActive : worshipHandsInactive;

    return (
      <View style={actionsViewStyle}>
        <ActionButton
          imageSource={require('../../assets/images/pijn.png')}
          iconStyle={{ height: 24, width: 26 }}
          onPress={() => this.sendPijn({ postId, author, currentDate, user })}
          disabled={pijnSentToday}
        />
        <ActionButton
          imageSource={require('../../assets/images/comment.png')}
          onPress={this.goToComments}
        />
        {user.uid === author.id ? (
            <ActionButton
              imageSource={require('../../assets/images/praise.png')}
              iconStyle={whStyle}
              onPress={() => this.worshipHandsPress({ postId, user })}
            />
          ) : (
            <ActionButton
              imageSource={require('../../assets/images/message.png')}
            />
          )
        }
      </View>
    );
  }

  render() {
    const { containerStyle, contentStyle, dividerStyle } = styles;
    const { redirect, post } = this.props;
    const { user, author, content, timestamp, createdOn, index, postId } = post;
    const userId = user.uid;
    const currentDate = new Date(
      new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
    );

    return (
      <Card containerStyle={containerStyle}>
        <CardBanner
          author={author}
          redirect={redirect}
          postEditUpdate={this.props.postEditUpdate}
          postText={content}
          postId={postId}
          timestamp={timestamp}
          createdOn={createdOn}
          userId={userId}
        />
        <Text style={contentStyle}>{content}</Text>
        <PostCounts
          noteCount={this.displayNoteCount()}
          commentCount={this.displayCommentCount()}
          commentsPress={() => this.goToComments({
            user, postId, author, index
          })}
          notesPress={this.goToPostNotes}
        />
        <Divider style={dividerStyle} />
        {this.postActionButtons({ postId, author, currentDate, user })}
      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  contentStyle: {
    fontSize: 16
  },
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

export default connect(null, {
  postEditUpdate,
  commentsPopulate,
  setActivePost,
  fetchPostCommentLikes,
  answerPrayer
})(PostListItem);
