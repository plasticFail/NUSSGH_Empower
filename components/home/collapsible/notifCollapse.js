import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import NotificationRow from '../notificationRow';

import {Colors} from '../../../styles/colors';
import {
  notif_log,
  morningObj,
} from '../../../commonFunctions/common';
import {getLogIncompleteText} from '../../../commonFunctions/notifFunction';
import {adjustSize} from '../../../commonFunctions/autoResizeFuncs';


const NotifCollapse = (props) => {
  const {hour, morningNotDone, afternoonNotDone} = props;
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const dropDownAnimation = useRef(new Animated.Value(1)).current;

  const [logNotDoneText, setLogNotDoneText] = useState('');

  const countNotif = () => {
    let total = 0;
    //add log notif
    if (hour === morningObj.name) {
      total -= 1;
      if (total < 0) {
        total = 0;
      }
    } else if (afternoonNotDone.length > 0 || morningNotDone.length > 0) {
      total++;
    }
    setCount(total);
  };

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

  //notification - add log * -----
  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    setLogNotDone();
    countNotif();
    if (
      hour === morningObj.name &&
      String(logNotDoneText).includes('Afternoon')
    ) {
      setLogNotDoneText('');
    }
  }, [morningNotDone, afternoonNotDone]);

  const setLogNotDone = () => {
    //get logs not done for morning and afternoon
    setLogNotDoneText(
      getLogIncompleteText(morningNotDone, afternoonNotDone, hour),
    );
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
          {logNotDoneText.length !== 0 && (
            <NotificationRow
              type={notif_log}
              hour={hour}
              text={logNotDoneText}
            />
          )}
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
    borderTopStartRadius: adjustSize(20),
    borderTopEndRadius: adjustSize(20),
  },
  headerTab: {
    padding: '3%',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
    fontSize: adjustSize(18),
    marginStart: '3%',
  },
});
