import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import CommentListItem from './CommentListItem';

const CommentList = ({ header, navigationTab }) => {
  const stateComments = useSelector(state => state.comments);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsArray = _.map(stateComments, val => {
      return { ...val };
    });

    if (comments.length < commentsArray.length) {
      setComments(commentsArray);
    }
  }, [stateComments]);

  const renderRow = (comment) => {
    return (
      <CommentListItem comment={comment} navigationTab={navigationTab} />
    );
  };

  if (comments.length === 0) { return null; }

  return (
    <View style={styles.masterContainerStyle}>
      <FlatList
        ListHeaderComponent={header}
        data={comments}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={({ item }, commentId) => commentId.toString()}
      />
    </View>
  );
};

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  writeCommentView: {
    paddingTop: 13
  }
};

export default CommentList;
