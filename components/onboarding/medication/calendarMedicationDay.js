import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

//show the calendar view with underline when there is medication for that particular day
const CalendarMedicationDay = (props) => {
  const {state, marking = {}, date} = props;

  const getContentStyle = () => {
    const style = {
      content: {},
      text: {
        color: '#181c26',
      },
      border: {},
    };

    if (state === 'disabled') {
      style.text.color = '#c1c2c1';
    } else if (marking.marked === true && marking.medicationList.length != 0) {
      style.text.color = 'black';
      style.content.backgroundColor = '#aad326';
      style.content.borderRadius = 10;
      style.border.borderWidth = 1;
      style.border.borderRadius = 20;
      style.border.width = '60%';
      style.border.borderColor = 'white';
    } else {
      style.content.backgroundColor = '#e2e2e2';
      style.content.borderRadius = 10;
    }
    return style;
  };

  //open modal with medication
  const onDayPress = () => {
    props.onPress(props.marking);
  };

  const contentStyle = getContentStyle();
  return (
    getContentStyle() && (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.content, contentStyle.content]}
          onPress={onDayPress}>
          <Text style={[styles.contentText, contentStyle.text]}>
            {String(date.day)}
          </Text>
          <View style={contentStyle.border} />
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  content: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
  },
});

export default CalendarMedicationDay;
