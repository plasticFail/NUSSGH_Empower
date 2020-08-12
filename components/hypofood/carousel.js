import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Text, Dimensions} from 'react-native';
import Item from './item';
import {useNavigation} from '@react-navigation/native';

const Carousel = (props) => {
  //basic carousel set up
  const {category} = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;
  const [intervals, setIntervals] = useState(1);
  const [width, setWidth] = useState(0);
  const [items, setItems] = useState(props.items);

  const navigation = useNavigation();

  const init = (width) => {
    const totalItems = items.length;
    // initialise width
    setWidth(width);
    // initialise total intervals
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  //if pass in random prop
  const randomiseBool = props.random === undefined ? false : props.random;
  const [randomBool, setRandomBool] = useState(randomiseBool);

  //show only 5 random items
  useEffect(() => {
    if (randomBool) {
      shuffleArray(items);
      if (items.length > 5) {
        setItems(items.slice(1, 6));
      }
    }
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  //if pass in random prop.

  return (
    <View style={[styles.container, styles.shadow]}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        onContentSizeChange={(w, h) => init(w)}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast">
        {items.map((item, index) => {
          return <Item content={item} />;
        })}
      </ScrollView>
      <Text
        style={styles.hyperLinkStyle}
        onPress={() => {
          navigation.navigate('ViewMore', {category});
        }}>
        View More
      </Text>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.width,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '2%',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    padding: '1%',
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
  hyperLinkStyle: {
    alignSelf: 'flex-end',
    color: '#3D5E50',
    margin: '3%',
    fontSize: 17,
  },
});
