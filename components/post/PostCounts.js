import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { lightTextGray } from '../../assets/colors';

const PostCounts = ({ noteCount, notesPress, commentCount, commentsPress }) => {
  const {
    loveNoteTextStyle, loveNoteIconStyle, commentTextStyle,
    countsViewStyle, countItemStyle
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
            <Text style={loveNoteTextStyle}>
              {noteCount} {noteCount === 1 ? 'note' : 'notes'}
            </Text>
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
  loveNoteTextStyle: {
    fontSize: 13
  },
  loveNoteIconStyle: {
    width: 22,
    height: 22,
    marginRight: 5
  },
  commentTextStyle: {
    color: lightTextGray,
    fontStyle: 'italic',
    fontSize: 13
  },
});

export default PostCounts;
