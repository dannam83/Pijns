import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';

import CommentListItem from './CommentListItem';
import {
  fetchActivePost,
  fetchPostCommentLikes,
  commentsPopulate,
  commentsClear,
  commentLikesClear
} from '../../actions';

const CommentList = ({ header, keepComments, navigationTab, userId, postId }) => {
  const dispatch = useDispatch();

  const stateComments = useSelector(state => state.comments);

  const [comments, setComments] = useState([]);

  // useEffect(async () => {
  //   dispatch(fetchActivePost(postId));
  //   dispatch(fetchPostCommentLikes({ userId, postId }));
  //   dispatch(commentsPopulate(postId));
  // });

  useEffect(() => {
    const commentsArray = _.map(stateComments, val => {
      return { ...val };
    });

    if (comments.length === 0 && commentsArray.length > 0) {
      setComments(commentsArray);
    }
  }, [stateComments]);

  // useEffect(() => {
  //   return function cleanup() {
  //     dispatch(commentsClear());
  //     dispatch(commentLikesClear({ userId, postId }));
  //     console.log('cleanup');
  //   };
  // });

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
