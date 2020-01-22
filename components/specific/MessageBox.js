import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBox = ({ children }) => {
  return (
    <View style={styles.emptyMessageContainer}>
      <Text style={styles.emptyMessageText}>
        {children}
      </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  emptyMessageContainer: {
    padding: 16, 
    marginHorizontal: 32, 
    marginTop: 16, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: 'lightgray',
    width: '86%'
  },
  emptyMessageText: {
    fontSize: 15
  }
});

export { MessageBox };
