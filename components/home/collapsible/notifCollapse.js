import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import NotificationRow from '../notificationRow';

import {bg_key} from '../../../commonFunctions/logFunctions';
import {Colors} from '../../../styles/colors';

const NotifCollapse = (props) => {
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const dropDownAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setOpen(true);
  }, []);

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
    <View onLayout={(event) => setMaxHeight(event.nativeEvent.layout.height)}>
      <View
        style={styles.cardTab}
        onLayout={(event) => setMinHeight(event.nativeEvent.layout.height)}>
        <TouchableOpacity
          onPress={() => {
            toggle(open);
          }}
          style={styles.headerTab}>
          <Text style={[styles.headerText, {flex: 1}]}>Notifications</Text>
          <Text style={styles.headerText}>{count}</Text>
        </TouchableOpacity>
      </View>
      {/*Content */}
      {open && (
        <Animated.View
          style={{
            maxHeight: heightInterpolation,
            backgroundColor: Colors.notifTab,
          }}>
          <NotificationRow type={bg_key} text={'hi'} />
        </Animated.View>
      )}
    </View>
  );
};

export default NotifCollapse;

const styles = StyleSheet.create({
  cardTab: {
    flexGrow: 1,
    backgroundColor: Colors.notifTab,
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
});