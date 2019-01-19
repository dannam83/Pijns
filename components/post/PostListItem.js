import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';

import { CardBanner, ListActionButton } from '../common';

class PostListItem extends Component {
  render() {
    const { author, content, notes, postId, sendPijn } = this.props.post;
    const { count } = notes;
    const currentDate = new Date(
      new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
    );
    const {
      containerStyle,
      dividerStyle,
      actionsViewStyle,
      loveNoteIconStyle,
      pijnsCountStyle
    } = styles;
    // const disabled={lastPijnDate === currentDate}

    return (
      <View>
        <Card containerStyle={containerStyle}>
          <CardBanner author={author} />
          <Text>{content}</Text>
          {
            count > 0 ? (
              <View style={pijnsCountStyle}>
              <Image
              source={require('../../assets/images/love-note.png')}
              style={loveNoteIconStyle}
              />
              <Text>{count} notes</Text>
              </View>
            ) : null
          }
          <Divider style={dividerStyle} />
          <View style={actionsViewStyle}>
            <ListActionButton
              imageSource={require('../../assets/images/pijn.png')}
              iconStyle={{ height: 24, width: 26 }}
              onPress={() => sendPijn({ postId, author, currentDate })}
            />
            <ListActionButton
              imageSource={require('../../assets/images/comment.png')}
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

export default PostListItem;
