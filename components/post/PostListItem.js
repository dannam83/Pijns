import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements';

import { CardBanner, ActionButton } from '../common';
import PostCounts from './PostCounts';
import { postEditUpdate, commentsPopulate, setActivePost } from '../../actions';

class PostListItem extends Component {
  state = {
    noteCount: this.props.post.notes ? this.props.post.notes.count : 0,
    commentCount: this.props.post.commentCount || 0,
  }

  goToComments = async () => {
    const { redirect, redirectTo, post } = this.props;
    const { user, postId, author, index, navigation } = post;

    await this.props.commentsPopulate(postId);
    await this.props.setActivePost({ postId, postAuthor: author });

    navigation.navigate(redirectTo, {
      user, postAuthorId: author.id, postId, redirect, index
    });
  };

  displayNoteCount = () => {
    const { post, list } = this.props;
    const { notes } = post;
    const noteCount = notes ? notes.count : 0;
    return (
      list === 'Friends' ? this.state.noteCount : noteCount
    );
  }

  displayCommentCount = () => {
    const { post, list } = this.props;
    const { commentCount } = post;
    let displayCommentCount;

    if (list === 'Friends') {
      displayCommentCount = this.state.commentCount;
    }
    if (list === 'Mine') {
      displayCommentCount = !commentCount ? 0 : commentCount;
    }

    return displayCommentCount;
  }

  sendPijn = ({ postId, author, currentDate }) => {
    const { list } = this.props;

    if (list === 'Friends') {
      this.setState({ noteCount: this.state.noteCount + 1 });
    }

    this.props.post.sendPijn({ postId, author, currentDate });
  }

  render() {
    const { redirect, post } = this.props;
    const { user, author, content, timestamp, createdOn, index } = post;
    const { postId, pijnSentToday } = post;
    const userId = user.uid;

    const currentDate = new Date(
      new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
    );

    const {
      containerStyle, contentStyle, dividerStyle, actionsViewStyle,
    } = styles;

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
        />
        <Divider style={dividerStyle} />
        <View style={actionsViewStyle}>
          <ActionButton
            imageSource={require('../../assets/images/pijn.png')}
            iconStyle={{ height: 24, width: 26 }}
            onPress={() => this.sendPijn({ postId, author, currentDate })}
            disabled={pijnSentToday}
          />
          <ActionButton
            imageSource={require('../../assets/images/comment.png')}
            onPress={this.goToComments}
          />
          <ActionButton
            imageSource={require('../../assets/images/message.png')}
          />
        </View>
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
};

export default connect(null, {
  postEditUpdate,
  commentsPopulate,
  setActivePost
})(PostListItem);
