import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';
import { Button, ListItem, Card } from 'react-native-elements';
import _ from 'lodash';

import { postsFetch } from '../actions';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
  };

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
    const { writePostView } = styles;

    return (
      <View>
        <View style={writePostView}>
          <Button
            title="Write a post!"
            onPress={() => this.props.navigation.navigate('PostCreate')}
            backgroundColor="rgba(0,125,255,1)"
            borderRadius={20}
            icon={{ name: 'create' }}
          />
        </View>

        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = {
  writePostView: {
    paddingTop: 10,
    paddingBottom: 10
  }
};

function mapStateToProps(state) {
  const posts = _.map(state.posts, (val, uid) => {
  return { ...val, uid };
  });

  return { posts };
  }

export default connect(mapStateToProps, { postsFetch })(HomeScreen);
