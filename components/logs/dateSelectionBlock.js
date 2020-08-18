import React, {useState, useRef} from 'react';
import {StyleSheet, Text, TextInput, View, Animated} from 'react-native';
//third party libs
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

const DateSelectionBlock = (props) => {
  const [visible, setVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const heightInterpolate = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 225], //I don't know how to get the height of the datepicker but 225 seems to fit it just nice.
    extrapolate: 'clamp',
  });

  const handleOpenCloseWithAnimation = (currentVisibility) => {
    if (currentVisibility) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300, // 300ms slide up animation when visible is set false.
        useNativeDriver: false,
      }).start(() => setVisible(false));
    } else {
      setVisible(true);
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300, // 300ms slide down animation when visible is set true.
        useNativeDriver: false,
      }).start();
    }
  };

  Moment.locale('en');

  return (
    <>
      <Text style={[styles.inputHeader, {marginTop: '4%'}]}>
        Record Date Time:
      </Text>
      <View style={styles.subContainer}>
        <TextInput
          style={styles.inputBoxFill}
          value={Moment(props.date).format('MMMM Do YYYY, h:mm a')}
          editable={false}
          placeholderTextColor="#a1a3a0"
        />
        <Ionicons
          name="calendar-outline"
          size={30}
          style={{marginStart: '5%'}}
          onPress={() => handleOpenCloseWithAnimation(visible)}
        />
      </View>
      {visible && (
        <Animated.View
          style={[
            styles.slideAnimationWrapperForDatePicker,
            {height: heightInterpolate},
          ]}>
          <DatePicker
            visible={visible}
            date={props.date}
            onDateChange={props.setDate}
            minimumDate={Moment(props.date).subtract(10, 'days').toDate()}
            maximumDate={Moment(props.date).add(10, 'minutes').toDate()}
            mode="datetime"
          />
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  inputBoxFill: {
    flex: 1,
    backgroundColor: '#EEF3BD',
    paddingStart: 20, //position placeholder text
    marginVertical: 10,
    fontSize: 19,
    color: 'black',
    padding: '2%',
  },
  slideAnimationWrapperForDatePicker: {
    overflow: 'hidden',
  },
});

export default DateSelectionBlock;
