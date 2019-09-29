import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { resetNotificationsCount } from '../../api/notifications_api';

class NotificationsIcon extends Component {
  onPress = () => {
    const { navigation, userId } = this.props;
    resetNotificationsCount(userId);
    navigation.navigate('NotificationsStack');
  }

  render() {
    const { name, size, focused, color, notifications } = this.props;

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <Ionicons focused={focused} name={name} size={size} color={color} />
        </TouchableWithoutFeedback>

        {notifications > 0 ?
          <View style={styles.badgeViewStyle}>
            <Text style={styles.badgeStyle}>
              { notifications < 100 ? notifications : '!!' }
            </Text>
          </View>
          :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeViewStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 11,
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
});

function mapStateToProps(state) {
  const { notificationsCount, navigation, user } = state;
  return ({ notifications: notificationsCount, navigation, userId: user.uid });
}

export default connect(mapStateToProps)(NotificationsIcon);
