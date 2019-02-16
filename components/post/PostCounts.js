import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { postCreateUpdate, postEditUpdate } from '../../actions';

class PostCounts extends Component {
  render() {
    const { pijnsCountStyle, loveNoteIconStyle } = styles;
    const { noteCount } = this.props;

    return (
      noteCount > 0 ? (
        <View style={pijnsCountStyle}>
        <Image
          source={require('../../assets/images/love-note.png')}
          style={loveNoteIconStyle}
        />
        <Text>{noteCount} {noteCount === 1 ? 'note' : 'notes'}</Text>
        </View>
      ) : null
    );
  }
}

const styles = {
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

const mapStateToProps = state => {
  return {
    postEditText: state.postEdit.postText,
    postCreateText: state.postCreate.postText
  };
};

export default connect(mapStateToProps, {
  postCreateUpdate, postEditUpdate
})(PostCounts);
