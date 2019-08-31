import React from 'react';
import { View, FlatList } from 'react-native';

const PeopleList = ({ data, renderItem, keyExtractor }) => {
  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    padding: 10
  }
};

export { PeopleList };
