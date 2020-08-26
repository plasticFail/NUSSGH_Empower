import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//third party library
import Modal from 'react-native-modal';
import moment from 'moment';
//component
import CalendarDayComponent from './calendarDay';
import CalendarTemplate from '../../calendar/calendarTemplate';

//responsible for adding a medication to the selected days*
const SelectDaysModal = (props) => {
  const {visible, closeModal} = props;
  const {selectedDates41, setSelectedDates41} = props;
  const {selectedMedicine} = props;

  const handleConfirm = () => {
    //handle medication object.
    closeModal();
  };

  //select and de-select date
  const addSelectedDate = (dateString) => {
    let newObj = {};
    //check if date is inside, if date is inside - deselect.
    if (Object.keys(selectedDates41).includes(dateString)) {
      console.log('----deselecting');
      delete selectedDates41[dateString];
      //markedDate prop in Calendar is immutable* need do below to show change
      setSelectedDates41(JSON.parse(JSON.stringify(selectedDates41)));
    } else {
      newObj = {
        ...selectedDates41,
        [dateString]: {
          selected: true,
          marked: true,
          medicine: selectedMedicine,
        },
      };
      setSelectedDates41(newObj);
    }
  };

  const selectAll = () => {
    console.log('Selecting all dates');
    let currentMonth = moment(new Date()).format('YYYY-MM');
    let daysInMonth = moment(currentMonth, 'YYYY-MM').daysInMonth();
    let newObj = {};
    setSelectedDates41({});

    for (i = 1; i <= daysInMonth; i++) {
      let stringDate = '';
      if (i < 10) {
        stringDate = currentMonth + '-0' + i;
      } else {
        stringDate = currentMonth + '-' + i;
      }
      newObj = {
        ...newObj,
        [stringDate]: {
          selected: true,
          marked: true,
          medicine: selectedMedicine,
        },
      };
    }
    setSelectedDates41(newObj);
  };

  return (
    <Modal isVisible={visible}>
      <View style={styles.dayModalContainer}>
        <Text style={styles.modalHeader}>Recurring Period</Text>
        <Text style={styles.modalDetails}>
          Select the recurring days for this medicine below
        </Text>
        <CalendarTemplate
          dayComponent={CalendarDayComponent}
          allowSelectAll={true}
          hideArrows={true}
          disableMonthChange={true}
          addSelectedDate={addSelectedDate}
          selectAll={selectAll}
          selectedDates41={selectedDates41}
        />
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SelectDaysModal;

const styles = StyleSheet.create({
  dayModalContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: '4%',
    marginStart: '4%',
  },
  modalDetails: {
    fontSize: 16,
    margin: '4%',
  },
  confirmButton: {
    backgroundColor: '#aad326',
    height: 45,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 15,
    margin: '4%',
  },
  confirmText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '3%',
    fontWeight: '700',
  },
});
