import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import CommentListItem from '../comment/CommentListItem';
import { commentsClear, commentLikesClear } from '../../actions';

class CommentList extends Component {
  componentWillUnmount() {
    const { user, postId } = this.props;
    this.props.commentsClear();
    this.props.commentLikesClear({ userId: user.uid, postId });
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

export default connect(mapStateToProps, {
  commentsClear, commentLikesClear
})(CommentList);
