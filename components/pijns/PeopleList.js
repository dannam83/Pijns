import React from 'react';
import { View, FlatList } from 'react-native';

const PeopleList = ({ data, renderItem, keyExtractor, Header }) => {
  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={Header}
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
