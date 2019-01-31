import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Input } from '../components/common';
import { searchUpdate } from '../actions';

class SearchFriendsScreen extends Component {
  static navigationOptions = {
    title: 'Search for friends',
  };

  onChangeText = (value) => {
    this.props.searchUpdate({ value });
  }

  renderHeader = () => {
    const { containerStyle, inputRestyle } = styles;

    return (
      <Input
        iconName='search1'
        placeholder={'Search'}
        containerRestyle={containerStyle}
        inputRestyle={inputRestyle}
        onChangeText={value => this.onChangeText(value)}
        autoCapitalize={'none'}
      />
    );
  }

  render() {
    console.log('props', this.props);
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={this.props.searchResults}
          renderItem={({ item }) => <Text>{item.searchName}</Text>}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={({ item }, userId) => userId.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    padding: 10
  },
  containerStyle: {
    backgroundColor: '#EAEAEA',
    borderRadius: 25
  },
};

function mapStateToProps(state) {
  let searchResults = _.map(state.searchResults, (val, userId) => {
    return { ...val, userId };
  });
  return { searchResults };
}

export default connect(mapStateToProps, { searchUpdate })(SearchFriendsScreen);
