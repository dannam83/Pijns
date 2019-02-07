import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ListItemAsButton, Button, ButtonAsText } from '../components/common';
import { fetchRequests, setFriendStatus } from '../actions';
import { buttonBlue } from '../assets/colors';

class NotificationsScreen extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  componentWillMount() {
    this.props.fetchRequests(this.props.currentUser.uid);
  }

  goToPublicProfile = (profileUser) => {
    const { navigate } = this.props.navigation;
    const redirect = () => navigate('PublicProfile', { profileUser });

    this.props.setFriendStatus({ status: 'See Requests' });
    redirect();
  };

  renderRow = (item) => {
    const {
      itemStyle, actionsViewStyle, acceptButtonStyle, acceptTextStyle
    } = styles;

    return (
      <View style={itemStyle}>
        <ListItemAsButton
          text={item.name}
          imageSource={item.picture}
          onPress={() => this.goToPublicProfile(item)}
        />
        <View style={actionsViewStyle}>
          <Button
            buttonRestyle={acceptButtonStyle}
            textRestyle={acceptTextStyle}
          >Accept</Button>
          <ButtonAsText>x</ButtonAsText>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={this.props.requests}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={({ item }, uid) => uid.toString()}
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
  itemStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  actionsViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  acceptButtonStyle: {
    width: 75,
    height: 25,
    backgroundColor: buttonBlue,
    borderColor: buttonBlue,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 17
  },
  acceptTextStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  }
};

function mapStateToProps(state) {
  console.log(state);
  let requests = _.map(state.requests, (val) => {
    return { ...val };
  });
  const { user } = state;
  return { requests, currentUser: user };
}

export default connect(mapStateToProps, {
  fetchRequests,
  setFriendStatus
})(NotificationsScreen);
