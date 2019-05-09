import React from 'react';
import { View, Text } from 'react-native';

import { greenBanner, lightTextGray } from '../../assets/colors';

const PostPrayerAnswered = ({ date }) => {
  const { containerStyle, badgeStyle, dateStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={badgeStyle}>
        <Text style={textStyle}>
          Prayer Answered
        </Text>
      </View>
      <Text style={dateStyle}>
        on {date}
      </Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 2
  },
  badgeStyle: {
    padding: 5,
    backgroundColor: greenBanner,
    width: 150,
    borderRadius: 75,
    alignItems: 'center'
  },
  dateStyle: {
    color: lightTextGray,
    fontWeight: '500',
    fontSize: 13,
    marginTop: 3,
  },
  textStyle: {
    color: 'white',
    fontWeight: '700'
  }
};

export default PostPrayerAnswered;
