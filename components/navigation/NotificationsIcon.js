import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

class NotificationsIcon extends Component {
  render() {
    const { name, size, focused, color, notificationsCount } = this.props;

    return (
      <View>
        {notificationsCount > 0 ?
          <View style={styles.badgeViewStyle}>
            <Text style={styles.badgeStyle}>
              { notificationsCount < 100 ? notificationsCount : '!' }
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
  const { requests } = state;
  let notificationsCount = 0;

  if (requests) {
    notificationsCount += Object.keys(requests).length;
  }

  return ({ notificationsCount });
}

export default connect(mapStateToProps)(NotificationsIcon);
