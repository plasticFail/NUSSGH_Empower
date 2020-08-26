import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ScheduledMedicationModal from './scheduledMedicationModal';

//show the calendar view with underline when there is medication for that particular day
//opens modal with scheduled medicine when select
const CalendarMedicationDay = (props) => {
  const {state, marking = {}, date} = props;
  const [visible, setVisible] = useState(false);

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
    } else if (marking.marked === true && marking.medicationList.length > 0) {
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
    console.log('opening modal for scheduled medicine');
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
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
        <ScheduledMedicationModal
          isVisible={visible}
          closeModal={closeModal}
          medicationList={marking.medicationList}
          date={date}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  content: {
    width: 40,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
  },
});

export default CalendarMedicationDay;
