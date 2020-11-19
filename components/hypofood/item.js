import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';

const Item = (props) => {
  const {content} = props;
  return (
    <View style={[styles.contentContainer, styles.shadow]}>
      <Image
        source={{uri: content.imgUrl.url}}
        style={styles.contentImg}
        resizeMode="cover"
      />
      <Text style={styles.foodName}>{content['food-name']}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: adjustSize(20),
    width: '100%',
    backgroundColor: '#f5f5f5',
    margin: '1%',
    borderRadius: adjustSize(20),
    alignItems: 'center',
    marginEnd: '2%',
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
    height: adjustSize(110),
    width: adjustSize(110),
    borderRadius: adjustSize(50),
    borderColor: '#aad326',
    borderWidth: 3,
  },
  foodName: {
    fontWeight: '700',
    color: '#0f0f0f',
    fontSize: adjustSize(17),
  },
  hyposerving: {
    fontWeight: '500',
    color: '#0f0f0f',
    fontSize: adjustSize(16),
  },
});

export default Item;
