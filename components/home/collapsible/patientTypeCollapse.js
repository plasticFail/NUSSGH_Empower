import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import {Colors} from '../../../styles/colors';
import {adjustSize} from '../../../commonFunctions/autoResizeFuncs';


const PatientType = (props) => {
  const {patient} = props;
  const [open, setOpen] = useState(true);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const dropDownAnimation = useRef(new Animated.Value(1)).current;

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

  useEffect(() => {
    setOpen(true);
  }, []);

  const heightInterpolation = dropDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [minHeight, maxHeight],
  });

  return (
    <View
      onLayout={(event) => setMaxHeight(event.nativeEvent.layout.height)}
      style={{backgroundColor: Colors.dailyTab}}>
      <View
        style={styles.cardTab}
        onLayout={(event) => setMinHeight(event.nativeEvent.layout.height)}>
        <TouchableOpacity
          onPress={() => {
            toggle(open);
          }}
          style={styles.headerTab}>
          <Text style={[styles.headerText, {flex: 1}]}>Patient Type</Text>
        </TouchableOpacity>
      </View>
      {/*Content */}
      {open && (
        <Animated.View
          style={{
            maxHeight: heightInterpolation,
            backgroundColor: Colors.patientType,
          }}>
          <View style={{marginBottom: '2%', flexDirection: 'row'}}></View>
        </Animated.View>
      )}
    </View>
  );
};

export default PatientType;

const styles = StyleSheet.create({
  cardTab: {
    backgroundColor: Colors.patientType,
    borderTopStartRadius: adjustSize(20),
    borderTopEndRadius: adjustSize(20),
  },
  headerTab: {
    padding: '3%',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: adjustSize(18),
    marginStart: '3%',
  },
  patientName: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: adjustSize(18),
    color: 'white',
    flex: 1,
    alignSelf: 'center',
  },
  optionIcon: {
    alignSelf: 'center',
    marginEnd: '3%',
  },
  detail: {
    fontSize: adjustSize(18),
    fontFamily: 'SFProDisplay-Regular',
  },
});
