import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

class NotificationsIcon extends Component {
  render() {
    const { name, size, focused, tintColor, notificationsCount } = this.props;
    return (
      <View>
        {notificationsCount > 0 ?
          <View style={styles.badgeViewStyle}>
            <Text style={styles.badgeStyle}>{notificationsCount}</Text>
          </View>
          :
          null
        }
        <Ionicons focused={focused} name={name} size={size} color={tintColor} />
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
    marginLeft: 16,
    marginTop: -3,
    width: 18,
    height: 18,
    borderRadius: 9
  },
  badgeStyle: {
    color: 'white'
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
