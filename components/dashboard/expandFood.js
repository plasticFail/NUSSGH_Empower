import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
  Image,
} from 'react-native';
//third party lib
import Entypo from 'react-native-vector-icons/Entypo';

const ExpandFood = (props) => {
  const {period, foodData} = props;
  const [open, setOpen] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const dropDownAnimation = useRef(new Animated.Value(1)).current;

  const toggle = (visible) => {
    if (visible) {
      setShowBottom(false);
      Animated.timing(dropDownAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      setShowBottom(true);
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
        style={[
          styles.periodContainer,
          showBottom ? {borderBottomWidth: 1} : {borderBottomWidth: 0},
        ]}>
        <Text style={styles.periodText}>{period}</Text>
        <TouchableOpacity
          onPress={() => {
            toggle(open);
          }}>
          {open ? (
            <Entypo name="chevron-small-up" size={30} />
          ) : (
            <Entypo name="chevron-small-down" size={30} />
          )}
        </TouchableOpacity>
      </View>
      {open ? (
        <Animated.View
          style={{
            maxHeight: heightInterpolation,
            paddingBottom: '2%',
          }}>
          {foodData.map((item, index) => (
            <View key={index}>
              {item?.foodItems.length > 0
                ? item?.foodItems.map((inner, index) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: '2%',
                      }}>
                      <Image
                        source={{uri: inner.imgUrl.url}}
                        style={styles.foodImg}
                      />
                      <Text style={styles.periodText}>
                        {inner['food-name']}
                      </Text>
                    </View>
                  ))
                : null}
            </View>
          ))}
        </Animated.View>
      ) : null}
    </View>
  );
};

export default ExpandFood;

const styles = StyleSheet.create({
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8ee',
    padding: '2%',
    marginTop: '2%',
  },
  periodText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    alignSelf: 'center',
  },
  foodImg: {
    height: 80,
    width: 80,
    borderRadius: 9.5,
    borderWidth: 2,
    borderColor: '#e2e8ee',
    marginEnd: '2%',
  },
});
