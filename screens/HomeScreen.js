import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import _ from 'lodash';
import firebase from 'firebase';

import * as actions from '../actions';
import PostListPost from '../components/post/PostListPost';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
  };

  componentWillMount() {
    this.props.postsFetch();
    console.log(this.props);
    this.createDataSource(this.props.posts);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are next set of props to be rendered with
    // this.props is still the old set of props
    console.log('next', nextProps);
    this.createDataSource(nextProps.posts);
  }

  createDataSource({ posts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(posts);
  }

  renderRow(post) {
    const { containerStyle, listItemHeaderStyle } = styles;
    const user = firebase.auth().currentUser;
    const { displayName, photoURL } = user;

    return (
      <View>
        <Card containerStyle={containerStyle}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: photoURL }}
          />
        <PostListPost post={post} />
          <Text>{post.postText}</Text>
        </Card>
      </View>

    );
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
  },
  containerStyle: {
    marginLeft: 0,
    marginRight: 0
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
