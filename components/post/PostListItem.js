import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';

import { CardBanner, ListActionButton } from '../common';
import { postEditUpdate, commentsPopulate } from '../../actions';

class PostListItem extends Component {
  render() {
    const {
      user,
      author,
      content,
      notes,
      timestamp,
      createdOn,
      postId,
      sendPijn,
      pijnSentToday,
      navigation,
      comments
    } = this.props.post;
    const { redirect } = this.props;
    const count = notes ? notes.count : 0;
    const userId = user.uid;
    const currentDate = new Date(
      new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
    );
    const {
      containerStyle,
      contentStyle,
      dividerStyle,
      actionsViewStyle,
      loveNoteIconStyle,
      pijnsCountStyle
    } = styles;
    const goToComments = async () => {
      await this.props.commentsPopulate(comments);
      navigation.navigate('Comments', {
        user, postAuthorId: author.id, postId, redirect
      });
    };

    return (
      <View>
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
          {
            count > 0 ? (
              <View style={pijnsCountStyle}>
              <Image
                source={require('../../assets/images/love-note.png')}
                style={loveNoteIconStyle}
              />
              <Text>{count} {count === 1 ? 'note' : 'notes'}</Text>
              </View>
            ) : null
          }
          <Divider style={dividerStyle} />
          <View style={actionsViewStyle}>
            <ListActionButton
              imageSource={require('../../assets/images/pijn.png')}
              iconStyle={{ height: 24, width: 26 }}
              onPress={() => sendPijn({ postId, author, currentDate })}
              disabled={pijnSentToday}
            />
            <ListActionButton
              imageSource={require('../../assets/images/comment.png')}
              onPress={goToComments}
            />
            <ListActionButton
              imageSource={require('../../assets/images/message.png')}
            />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    backgroundColor: 'white'
  },
  contentStyle: {
    fontSize: 14
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
  pijnsCountStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  loveNoteIconStyle: {
    width: 23,
    height: 23,
    marginRight: 5
  }
};

export default connect(null, { postEditUpdate, commentsPopulate })(PostListItem);
