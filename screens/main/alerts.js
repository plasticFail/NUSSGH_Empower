import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Animated, Dimensions} from 'react-native';
import MenuBtn from '../../components/menuBtn';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import logStyles from '../../styles/logStyles';
import InProgress from '../../components/inProgress';

const AlertsScreen = (props) => {
  const slideRightAnimation = useRef(new Animated.Value(0)).current;

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
        <Text style={globalStyles.pageHeader}>Alerts</Text>
        <InProgress />
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
