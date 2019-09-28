import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { lightTextGray } from '../../assets/colors';

const PostCounts = ({ noteCount, notesPress, commentCount, commentsPress }) => {
  const {
    countItemStyle, loveNoteIconStyle, commentTextStyle, countsViewStyle
  } = styles;

  return (
    <View style={countsViewStyle}>
      {
        noteCount > 0 ? (
          <TouchableOpacity style={countItemStyle} onPress={notesPress}>
            <Image
              source={require('../../assets/images/love-note.png')}
              style={loveNoteIconStyle}
            />
            <Text>{noteCount} {noteCount === 1 ? 'note' : 'notes'}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )
      }

      {
        commentCount > 0 ? (
          <TouchableOpacity style={countItemStyle} onPress={commentsPress}>
            <Text style={commentTextStyle}>{commentCount} comments</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  countsViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  countItemStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loveNoteIconStyle: {
    width: 23,
    height: 23,
    marginRight: 5
  },
  commentTextStyle: {
    color: lightTextGray,
    fontStyle: 'italic'
  },
});

export default PostCounts;
