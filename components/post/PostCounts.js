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
              {noteCount} {noteCount === 1 ? 'Note' : 'Notes'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )
      }
      <View style={{ flexDirection: 'row' }}>
        {
          commentCount > 0 ? (
            <TouchableOpacity style={countItemStyle} onPress={commentsPress}>
              <Text style={commentTextStyle}>
                {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )
        }
        {
          commentCount > 0 ? (
            <TouchableOpacity style={[countItemStyle, { marginLeft: 10 }]} onPress={commentsPress}>
              <Text style={commentTextStyle}>
                3 Likes
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countsViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  countItemStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loveNoteTextStyle: {
    fontSize: 13,
  },
  loveNoteIconStyle: {
    width: 17,
    height: 17,
    marginRight: 5
  },
  commentTextStyle: {
    color: lightTextGray,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default PostCounts;
