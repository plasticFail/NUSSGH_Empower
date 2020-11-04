import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Animated, Dimensions} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import {notif_log, notif_addlog} from '../../commonFunctions/common';
import NotificationRow from '../../components/home/notificationRow';
import {useNavigation} from '@react-navigation/native';
import {storeReadNotif} from '../../storage/asyncStorageFunctions';
import {bg_key} from '../../commonFunctions/logFunctions';

const AlertsScreen = (props) => {
  const {logsNotDone} = props;
  const {reInit, setBadge} = props;
  const [currHour, setCurrHour] = useState(new Date().getHours());
  const slideRightAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    reInit().then(() => {});
  }, []);

  useEffect(() => {
    //slide right when enter screen
    navigation.addListener('focus', () => {
      //init notifications set from caregiverdashboard
      reInit().then(() => {});
      //when enter screen, set notification as read
      storeReadNotif(true).then(() => {});
      setBadge();

      slideRightAnimation.setValue(0);
      Animated.timing(slideRightAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [navigation]);

  console.log('in alerts ');
  console.log(logsNotDone);

  const widthInterpolate = slideRightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={globalStyles.pageContainer}>
      <Animated.View
        style={{
          ...props.style,
          ...{transform: [{translateX: widthInterpolate}]},
        }}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => navigation.navigate('Home')} />
        </View>
        <Text style={globalStyles.pageHeader}>Alert</Text>
        {logsNotDone.map(
          (item) =>
            item?.msg.length > 0 && (
              <NotificationRow
                type={notif_addlog}
                hour={currHour}
                text={item.msg}
                style={{
                  borderColor: '#e1e7ed',
                  borderWidth: 1,
                  padding: '4%',
                }}
                icon={item.type}
              />
            ),
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
