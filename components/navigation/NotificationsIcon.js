import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { resetNotificationsCount } from '../../api/notifications_api';

class NotificationsIcon extends Component {
  onPress = () => {
    const { navigation, userId } = this.props;
    resetNotificationsCount(userId);
    navigation.navigate('Notifications');
  }

  render() {
    const { name, size, focused, color, notifications } = this.props;

    return (
      <View>
        {notifications > 0 ?
          <View style={styles.badgeViewStyle}>
            <Text style={styles.badgeStyle}>
              { notifications < 100 ? notifications : '!!' }
            </Text>
          </View>
          :
          null
        }
        <TouchableWithoutFeedback onPress={this.onPress}>
          <Ionicons focused={focused} name={name} size={size} color={color} />
        </TouchableWithoutFeedback>
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
  const { notificationsCount, navigation, user } = state;
  return ({ notifications: notificationsCount, navigation, userId: user.uid });
}

export default connect(mapStateToProps)(NotificationsIcon);
