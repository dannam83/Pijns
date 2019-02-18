import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { postCreateUpdate, postEditUpdate } from '../../actions';
import { lightTextGray } from '../../assets/colors';

class PostCounts extends Component {
  noteCount = () => {
    const { countItemStyle, loveNoteIconStyle } = styles;
    const { noteCount, notesPress } = this.props;

    return (
      noteCount > 0 ? (
        <TouchableOpacity style={countItemStyle} onPress={notesPress}>
          <Image
            source={require('../../assets/images/love-note.png')}
            style={loveNoteIconStyle}
          />
          <Text>{noteCount} {noteCount === 1 ? 'note' : 'notes'}</Text>
        </TouchableOpacity>
      ) : null
    );
  }

  commentCount = () => {
    const { commentCount, commentsPress } = this.props;
    const { countItemStyle, commentTextStyle } = styles;

    return (
      commentCount > 0 ? (
        <TouchableOpacity style={countItemStyle} onPress={commentsPress}>
          <Text style={commentTextStyle}>{commentCount} comments</Text>
        </TouchableOpacity>
      ) : null
    );
  }

  render() {
    const { countsViewStyle } = styles;

    return (
      <View style={countsViewStyle}>
        {this.noteCount()}
        {this.commentCount()}
      </View>
    );
  }
}

const styles = {
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
};

const mapStateToProps = state => {
  return {
    postEditText: state.postEdit.postText,
    postCreateText: state.postCreate.postText
  };
};

export default connect(mapStateToProps, {
  postCreateUpdate, postEditUpdate
})(PostCounts);
