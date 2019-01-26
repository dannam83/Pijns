import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
// import _ from 'lodash';

import { commentsFetch } from '../../actions';
// import CommentListItem from '../comment/CommentListItem';

class CommentList extends Component {
  componentWillMount() {
    commentsFetch(this.props.postId);
  }

  renderRow = ({ comment }) => {
    return (
      <Text>{comment}</Text>
    );
  }
  // <CommentListItem comment={comment} redirect={this.props.redirect} />

  // renderHeader = () => {
  //   return (
  //     <View style={styles.writeCommentView}>
  //       <Button
  //         title="Write a comment!"
  //         onPress={() => this.props.redirect('CommentCreate')}
  //         backgroundColor="rgba(0,125,255,1)"
  //         borderRadius={20}
  //         icon={{ name: 'create' }}
  //       />
  //     </View>
  //   );
  // }

  render() {
    const { comments } = this.props;
    console.log('comments', this.props);

    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={comments}
          renderItem={({ item }) => this.renderRow(item)}
          // ListHeaderComponent={this.renderHeader}
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
  console.log('state', state);
  // let comments = _.map(state.comments, (val, uid) => {
  //   return { ...val, commentId: uid };
  // });
  // return { comments };
  return {};
}

export default connect(mapStateToProps, { commentsFetch })(CommentList);
