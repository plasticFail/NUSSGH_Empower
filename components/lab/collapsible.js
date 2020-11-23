import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
//third party lib
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';

const Collapsible = (props) => {
  const {title, detailArr} = props;
  const [open, setOpen] = useState(false);
  const dropDownAnimation = useRef(new Animated.Value(1)).current;
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  const heightInterpolation = dropDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [minHeight, maxHeight],
  });

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

  return (
    <View onLayout={(event) => setMaxHeight(event.nativeEvent.layout.height)}>
      <>
        <TouchableOpacity
          onPress={() => toggle(open)}
          style={[{flexDirection: 'row', padding: '3%'}]}>
          <Text style={styles.headerStyle}>{title}</Text>
          {open ? (
            <Feather name="chevron-up" size={30} color={'#8b8f9a'} />
          ) : (
            <Feather name="chevron-down" size={30} color={'#8b8f9a'} />
          )}
        </TouchableOpacity>
        <View style={styles.border} />
      </>
      {open ? (
        <Animated.View
          style={{
            maxHeight: heightInterpolation,
            paddingBottom: '2%',
          }}>
          {detailArr?.map((item, index) => (
            <View
              style={[
                styles.border,
                {
                  flexDirection: 'row',
                  marginStart: '20%',
                  padding: '3%',
                  justifyContent: 'space-between',
                },
              ]}
              key={index}>
              <Text style={styles.bold}>{item?.title}</Text>
              {evaluateValue(item)}
            </View>
          ))}
        </Animated.View>
      ) : null}
    </View>
  );
};
export default Collapsible;

function evaluateValue(item) {
  if (item?.comparator === '<=') {
    if (item?.value <= item?.target) {
      return (
        <Text style={styles.value}>
          {item?.value} {item?.units}
        </Text>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.value, styles.redValue]}>
            {item?.value} {item?.units}
          </Text>
          <Ionicons name="alert-circle-outline" size={30} color={'#ff0844'} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  border: {
    borderBottomColor: '#e1e7ed',
    borderBottomWidth: 1,
    marginStart: '3%',
    marginEnd: '3%',
  },
  headerStyle: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: adjustSize(20),
    opacity: 0.6,
    flex: 1,
  },
  bold: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: adjustSize(16),
  },
  value: {
    fontFamily: 'SFProDisplay-Regular',
    opacity: 0.6,
    fontSize: adjustSize(16),
  },
  redValue: {
    color: '#ff0844',
    opacity: 1,
    alignSelf: 'center',
    marginEnd: '2%',
  },
});
