import React from 'react';
import { View, Text } from 'react-native';

const PostPrayerAnswered = () => {
  return (
    <View style={styles.containerStyle}>
      <Text>Prayer Answered</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 2,
    padding: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
  }
};

export default PostPrayerAnswered;
