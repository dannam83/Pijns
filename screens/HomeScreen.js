import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import _ from 'lodash';

import * as actions from '../actions';
import { CardBanner } from '../components/common';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
  };

  componentWillMount() {
    this.props.postsFetch();
    this.createDataSource(this.props.posts);
  }

  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps);
    this.createDataSource(nextProps.posts);
  }

  createDataSource({ posts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(posts);
  }

  renderHeader() {
    return (
      <View style={styles.writePostView}>
        <Button
          title="Write a post!"
          onPress={() => this.props.navigation.navigate('PostCreate')}
          backgroundColor="rgba(0,125,255,1)"
          borderRadius={20}
          icon={{ name: 'create' }}
        />
      </View>
    );
  }

  renderRow(post) {
    const { containerStyle } = styles;

    return (
      <View>
        <Card containerStyle={containerStyle}>
          <CardBanner author={post.author} />
          <Text>{post.content}</Text>
        </Card>
      </View>
    );
  }

  render() {
    const { masterContainerStyle } = styles;

    return (
      <View style={masterContainerStyle}>


        <ListView
          enableEmptySections
          renderSeperator
          renderHeader={this.renderHeader}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff'
  },
  writePostView: {
    paddingTop: 13,
  },
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'white'
  },
  listItemHeaderStyle: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0
  }
};

function mapStateToProps(state) {
  console.log('state', state);
  const posts = _.map(state.posts, (val, uid) => {
  return { ...val, uid };
  });

  return { posts: { posts }, state };
}

export default connect(mapStateToProps, actions)(HomeScreen);
