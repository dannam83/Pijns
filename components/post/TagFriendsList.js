import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Input, ListItemAsButton } from '../../components/common';
import { searchUpdate, getFriendStatus, fetchFriendList } from '../../actions';

import TagFriendsListItem from './TagFriendsListItem';

// const TagFriendsListX = ({ data, keyExtractor, friendList, searchedList }) => {
//   const [allFriends, setAllFriends] = useState({});
//   const [searchFriends, setSearchFriends] = useState({});
//
//   useEffect(() => {
//     const friends = _.map(friendList, (val, userId) => {
//       return { ...val, userId };
//     });
//     setAllFriends(friends);
//   }, []);
//
//   useEffect(() => {
//     const friends = _.map(searchedList, (val, userId) => {
//       return { ...val, userId };
//     });
//     setSearchFriends(friends);
//   }, [searchFriends]);
//
//   const friends = searchFriends[0] ? searchFriends : allFriends;
//
//   const renderHeaderItem = friend => {
//     return (
//       <TagFriendsListItem friend={friend} tagged />
//     );
//   };
//
//   const Header = taggedFriends => {
//     return (
//       <View>
//         <Text>Header</Text>
//         <FlatList
//           data={taggedFriends}
//           renderItem={renderHeaderItem}
//           keyExtractor={keyExtractor}
//         />
//       </View>
//     );
//   };
//
//   const renderItem = friend => {
//     return (
//       <TagFriendsListItem friend={friend} />
//     );
//   };
//
//   return (
//     <View style={styles.containerStyle}>
//       <FlatList
//         data={friends}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         ListHeaderComponent={Header}
//       />
//       <Text>search</Text>
//     </View>
//   );
// };

// const styles = {
//   containerStyle: {
//     flex: 1,
//     padding: 10
//   }
// };

// export default TagFriendsList;

// import React, { Component } from 'react';
// import { View, FlatList } from 'react-native';
// import { connect } from 'react-redux';
// import _ from 'lodash';
//
// import { Input, ListItemAsButton } from '../components/common';
// import { searchUpdate, getFriendStatus, fetchFriendList } from '../actions';

class TagFriendsList extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props) {
    super(props);
    props.fetchFriendList(props.currentUser.uid);
  }

  onChangeText = (value) => {
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
        autoFocus
      />
    );
  }

  renderRow = (item) => {
    if (item.userId === this.props.currentUser.uid) {
      return null;
    }

    return (
      <ListItemAsButton
        text={item.searchName}
        imageSource={item.picture}
        onPress={() => this.goToPublicProfile(item)}
      />
    );
  }

  render() {
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={this.props.searchResults}
          renderItem={({ item }) => this.renderRow(item)}
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
  const { user, friendList } = state;
  return { searchResults, currentUser: user, friendList };
}

export default connect(mapStateToProps, {
  searchUpdate,
  getFriendStatus,
  fetchFriendList
})(TagFriendsList);
