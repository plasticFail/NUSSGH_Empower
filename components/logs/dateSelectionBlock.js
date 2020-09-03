import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
//third party libs
import Moment from 'moment';
import DatePicker from 'react-native-date-picker';
import logStyles from '../../styles/logStyles';

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
      <Text style={logStyles.fieldName}>Record Date Time:</Text>
      <TouchableOpacity onPress={() => handleOpenCloseWithAnimation(visible)}>
        <Text
          style={logStyles.inputField}
          editable={false}
          placeholderTextColor="#a1a3a0">
          {Moment(props.date).format('MMMM Do YYYY, h:mm a')}
        </Text>
      </TouchableOpacity>
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
  slideAnimationWrapperForDatePicker: {
    overflow: 'hidden',
    marginStart: '4%',
    marginEnd: '4%',
  },
});

export default DateSelectionBlock;
