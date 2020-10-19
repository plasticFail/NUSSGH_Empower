import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import NotificationRow from '../notificationRow';

import {bg_key, checkLogDone} from '../../../commonFunctions/logFunctions';
import {Colors} from '../../../styles/colors';
import {
  notif_log,
  morningObj,
  afternoonObj,
  eveningObj,
} from '../../../commonFunctions/common';

const NotifCollapse = (props) => {
  const {hour, morningNotDone, afternoonNotDone} = props;
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const dropDownAnimation = useRef(new Animated.Value(1)).current;

  const [logNotDoneText, setLogNotDoneText] = useState('');

  useEffect(() => {
    setOpen(true);
    setLogNotDone();
  }, []);

  useEffect(() => {
    setLogNotDone();
    countNotif();
  }, [morningNotDone, afternoonNotDone]);

  const countNotif = () => {
    let total = 0;
    //add log notif
    if (afternoonNotDone.length > 0 || morningNotDone.length > 0) {
      total += total + 1;
    }
    setCount(total);
  };

  const setLogNotDone = () => {
    //get logs not done for morning and afternoon
    let string = '';
    let morningLength =
      morningNotDone?.length === null ? 0 : morningNotDone?.length;
    let afternoonLength =
      afternoonNotDone?.length === null ? 0 : afternoonNotDone?.length;
    //prepare message
    if (hour === afternoonObj.name && morningNotDone > 0) {
      string = morningLength + ' in Morning';
    }
    if (hour === eveningObj.name && afternoonLength > 0 && morningLength > 0) {
      string =
        morningLength + ' in Morning & ' + afternoonLength + ' in Afternoon';
    } else {
      if (morningLength === 0 && afternoonLength > 0) {
        string = afternoonLength + ' in Afternoon.';
      } else if (afternoonLength == 0 && morningLength > 0) {
        string = morningLength + ' in Morning';
      }
    }
    setLogNotDoneText(string);
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
          {logNotDoneText.length != 0 && (
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
