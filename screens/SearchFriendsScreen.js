import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';

import { Input } from '../components/common';

class SearchFriendsScreen extends Component {
  static navigationOptions = {
    title: 'Search for friends',
  };

  renderHeader = () => {
    return (
      <Input
        iconName='search1'
        placeholder={'Search'}
      />
    );
  }

  render() {
    // const { posts } = this.props;

    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={[{ one: 'hi', two: 1 }, { one: 'hello', two: 2 }]}
          renderItem={({ item }) => <Text>{item.one}</Text>}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={({ item }, two) => two.toString()}
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
};

export default (SearchFriendsScreen);
