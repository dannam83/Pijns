import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';
import _ from 'lodash';

import CommentListItem from './CommentListItem';

const CommentList = ({ header, navigationTab, postId }) => {
  const stateComments = useSelector(state => state.comments);
  const stateCommentsPostId = useSelector(state => state.commentsPostId);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsArray = _.map(stateComments, val => {
      return { ...val };
    });

    if (postId === stateCommentsPostId) {
      setComments(commentsArray);
    }
  }, [stateComments]);

  const renderRow = (comment) => {
    return (
      <CommentListItem comment={comment} navigationTab={navigationTab} />
    );
  };

  return (
    <View style={styles.masterContainerStyle}>
      <FlatList
        ListHeaderComponent={header}
        ListEmptyHeader={header}
        data={comments}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={({ item }, commentId) => commentId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  writeCommentView: {
    paddingTop: 13
  }
});

export default CommentList;
