import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import { Input } from '../components/common';
import { searchUpdate } from '../actions';

class SearchFriendsScreen extends Component {
  static navigationOptions = {
    title: 'Search for friends',
  };

  onChangeText = (value) => {
    console.log('props', this.props);
    this.props.searchUpdate({ value });
  }

  renderHeader = () => {
    const { containerStyle } = styles;

    return (
      <Input
        iconName='search1'
        placeholder={'Search'}
        containerRestyle={containerStyle}
        onChangeText={value => this.onChangeText(value)}
        autoCapitalize={'none'}
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
    padding: 10
  },
  containerStyle: {
    backgroundColor: '#fff',
    borderRadius: 25
  }
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { searchUpdate })(SearchFriendsScreen);
