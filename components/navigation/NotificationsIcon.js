import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

class NotificationsIcon extends Component {
  render() {
    const { name, size, focused, color, notifications } = this.props;

    return (
      <View>
        {notifications > 0 ?
          <View style={styles.badgeViewStyle}>
            <Text style={styles.badgeStyle}>
              { notifications < 100 ? notifications : '!' }
            </Text>
          </View>
          :
          null
        }
        <Ionicons focused={focused} name={name} size={size} color={color} />
      </View>
    );
  }
}

const styles = {
  badgeViewStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 17,
    marginTop: -4,
    width: 20,
    height: 20,
    borderRadius: 10
  },
  badgeStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
};

function mapStateToProps(state) {
  // const { requests, notifications } = state;
  // let notificationsCount = 0;
  //
  // if (requests) {
  //   notificationsCount += Object.keys(requests).length;
  // }
  //
  // if (notifications) {
  //   Object.keys(notifications).forEach(key => {
  //     if (notifications[key].newPijns > 0) { notificationsCount += 1; }
  //   });
  // }
  console.log(state);
  const { count } = state.notifications.newNotifications;
  return ({ notifications: count });
}

export default connect(mapStateToProps)(NotificationsIcon);
