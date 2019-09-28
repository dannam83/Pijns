import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ badgeViewRestyle, badgeRestyle, countDisplay, count }) => {
  const { badgeViewStyle, badgeStyle } = styles;

  if (!count || count < 1) { return null; }

  return (
    <View style={[badgeViewStyle, badgeViewRestyle]}>
      <Text style={[badgeStyle, badgeRestyle]}>
        {countDisplay()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeViewStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export { Badge };
