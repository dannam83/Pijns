import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import CommentListItem from '../comment/CommentListItem';
import { commentsClear } from '../../actions';

class PostNotesList extends Component {
  componentWillUnmount() {
    this.props.commentsClear();
  }

  renderRow = (comment) => {
    return (
      <CommentListItem comment={comment} />
    );
  }

  render() {
    const { comments } = this.props;

    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={comments}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={({ item }, commentId) => commentId.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  writeCommentView: {
    paddingTop: 13
  }
};

function mapStateToProps(state) {
  let comments = _.map(state.comments, val => {
    return { ...val };
  });
  return { comments };
}

export default connect(mapStateToProps, { commentsClear })(PostNotesList);
