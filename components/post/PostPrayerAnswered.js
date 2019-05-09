import React from 'react';
import { View, Text } from 'react-native';

import { greenBanner } from '../../assets/colors';

const PostPrayerAnswered = () => {
  const { containerStyle, badgeStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={badgeStyle}>
        <Text style={textStyle}>
          Prayer Answered
        </Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
  },
  badgeStyle: {
    padding: 5,
    backgroundColor: greenBanner,
    width: 200,
    borderRadius: 100,
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: '700'
  }
};

export default PostPrayerAnswered;
