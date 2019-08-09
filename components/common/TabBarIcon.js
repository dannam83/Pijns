import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';

class TabBarIcon extends Component {
  render() {
    const { name, size, focused, tintColor } = this.props;
    return (
      <Ionicons
        focused={focused}
        name={name}
        size={size}
        color={tintColor}
      />
    );
  }
}

export { TabBarIcon };
