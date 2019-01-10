import React from 'react';
import { View } from 'react-native';

const LoginInputSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    width: 330,
    borderRadius: 7,
    marginBottom: 6,
  }
};

export { LoginInputSection };
