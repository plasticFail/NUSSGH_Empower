import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import Item from './item';

const Carousel = (props) => {
  const {items} = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    console.log('---' + totalItems);
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
    console.log('--' + intervals);
  };

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
        snapToAlignment="start"
        snapToAlignment="center"
        decelerationRate="fast">
        {items.map((item, index) => {
          return <Item content={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    borderColor: '#ebebeb',
    borderWidth: 1,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
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
  bullets: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 30,
  },
});
