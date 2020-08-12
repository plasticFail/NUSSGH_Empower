import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const Item = (props) => {
  const {content} = props;
  return (
    <View style={[styles.contentContainer, styles.shadow]}>
      <Image source={{uri: content.imgUrl.url}} style={styles.contentImg} />
      <Text>{content['food-name']}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentImg: {
    height: 110,
    width: 110,
  },
});

export default Item;
