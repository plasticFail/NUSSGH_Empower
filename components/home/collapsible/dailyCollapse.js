import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import UncompleteLogCard from '../../uncompleteLogCard';
import {green_color} from '../../../commonFunctions/common';
import {Colors} from '../../../styles/colors';

const DailyCollapse = (props) => {
  const {uncompleteLogs, hour} = props;
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const dropDownAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    setCount(uncompleteLogs.length);
  }, [uncompleteLogs]);

  const toggle = (visible) => {
    if (visible) {
      Animated.timing(dropDownAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.timing(dropDownAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const heightInterpolation = dropDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [minHeight, maxHeight],
  });

  return (
    <View
      onLayout={(event) => setMaxHeight(event.nativeEvent.layout.height)}
      style={{backgroundColor: Colors.notifTab}}>
      <View
        style={styles.cardTab}
        onLayout={(event) => setMinHeight(event.nativeEvent.layout.height)}>
        <TouchableOpacity
          onPress={() => {
            toggle(open);
          }}
          style={styles.headerTab}>
          <Text style={[styles.headerText, {flex: 1}]}>Daily Tasks</Text>
          <Text style={styles.headerText}>{count}</Text>
        </TouchableOpacity>
      </View>
      {/*Content */}
      {open && (
        <Animated.View
          style={{
            maxHeight: heightInterpolation,
            backgroundColor: Colors.dailyTab,
          }}>
          {uncompleteLogs.length > 0 ? (
            <>
              <Text style={styles.greetingText}>
                Create a log for the {hour}
              </Text>
              <UncompleteLogCard
                uncompleteLogs={uncompleteLogs}
                color={green_color}
                hideChevron={true}
              />
            </>
          ) : (
            <Text style={styles.taskText}>
              You have completed your logs for the {hour}!
            </Text>
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default DailyCollapse;

const styles = StyleSheet.create({
  cardTab: {
    backgroundColor: Colors.dailyTab,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  headerTab: {
    padding: '3%',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
    fontSize: 18,
    marginStart: '3%',
  },
  greetingText: {
    color: '#005c30',
    fontSize: 18,
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  taskText: {
    fontFamily: 'SFProDisplay-Regular',
    color: 'white',
    marginStart: '5%',
    fontSize: 18,
  },
});
