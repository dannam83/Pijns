import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, Image } from 'react-native';
import { Button, Card, Divider } from 'react-native-elements';
import _ from 'lodash';

import * as actions from '../actions';
import { CardBanner, ListActionButton } from '../components/common';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
  };

  componentWillMount() {
    this.props.postsFetch();
    this.createDataSource(this.props.posts);
  }

  componentWillReceiveProps(nextProps) {
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
    const {
      containerStyle,
      dividerStyle,
      actionsViewStyle,
      loveNoteIconStyle,
      pijnsCountStyle
    } = styles;

    return (
      <View>
        <Card containerStyle={containerStyle}>
          <CardBanner author={post.author} />
          <Text>{post.content}</Text>
          <View style={pijnsCountStyle}>
            <Image
              source={require('../assets/images/love-note.png')}
              style={loveNoteIconStyle}
            />
            <Text>123 notes</Text>
          </View>
          <Divider style={dividerStyle} />
          <View style={actionsViewStyle}>
            <ListActionButton
              imageSource={require('../assets/images/pijn.png')}
              iconStyle={{ width: 27 }}
            />
            <ListActionButton
              imageSource={require('../assets/images/comment.png')}
            />
            <ListActionButton
              imageSource={require('../assets/images/message.png')}
            />
          </View>
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
    padding: 10,
    backgroundColor: 'white'
  },
  dividerStyle: {
    backgroundColor: '#D3D3D3',
    marginTop: 10,
    marginBottom: 10
  },
  actionsViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 60,
    paddingRight: 60
  },
  pijnsCountStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  loveNoteIconStyle: {
    width: 23,
    height: 23,
    marginRight: 5
  }
};

function mapStateToProps(state) {
  const posts = _.map(state.posts, (val, uid) => {
  return { ...val, uid };
  });

  return { posts: { posts }, state };
}

export default connect(mapStateToProps, actions)(HomeScreen);
