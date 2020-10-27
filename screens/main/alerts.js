import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Animated, Dimensions} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import {checkLogDone} from '../../commonFunctions/logFunctions';
import {
  morningObj,
  afternoonObj,
  notif_log,
} from '../../commonFunctions/common';
import NotificationRow from '../../components/home/notificationRow';
import getLogIncompleteText from '../../commonFunctions/notifFunction';

const AlertsScreen = (props) => {
  const slideRightAnimation = useRef(new Animated.Value(0)).current;
  const [currHour, setCurrHour] = useState(new Date().getHours());
  //log notif
  const [morningNotDone, setMorningNotDone] = useState([]);
  const [afternoonNotDone, setAfternoonNotDone] = useState([]);
  const [logNotDoneText, setLogNotDoneText] = useState('');

  useEffect(() => {
    //slide right when enter screen
    props.navigation.addListener('focus', () => {
      slideRightAnimation.setValue(0);
      Animated.timing(slideRightAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [props.navigation]);

  const widthInterpolate = slideRightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width, 0],
    extrapolate: 'clamp',
  });

  const initUncompleteLog = () => {
    if (currHour != morningObj.name) {
      checkLogDone(morningObj.name).then((response) => {
        if (response != null) {
          setMorningNotDone(response.notCompleted);
        }
      });

      checkLogDone(afternoonObj.name).then((response) => {
        if (response != null) {
          setAfternoonNotDone(response.notCompleted);
        }
      });
    }
    console.log(
      getLogIncompleteText(morningNotDone, afternoonNotDone, currHour),
    );
    setLogNotDoneText(
      getLogIncompleteText(morningNotDone, afternoonNotDone, currHour),
    );
  };

  return (
    <View style={globalStyles.pageContainer}>
      <Animated.View
        style={{
          ...props.style,
          ...{transform: [{translateX: widthInterpolate}]},
        }}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
        </View>
        <Text style={globalStyles.pageHeader}>Alert</Text>
        {logNotDoneText.length > 0 && (
          <NotificationRow
            type={notif_log}
            hour={currHour}
            text={logNotDoneText}
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlertsScreen;
