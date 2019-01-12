import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { postsFetch } from '../actions';
import ListItem from './ListItem';

class PostList extends Component {
  componentWillMount() {
    this.props.postsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are next set of props to be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ posts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(posts);
  }

  renderRow(post) {
    return <ListItem post={post} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const posts = _.map(state.posts, (val, uid) => {
    return { ...val, uid };
  });

  return { posts };
};

export default connect(mapStateToProps, { postsFetch })(PostList);
