import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//third party library
import Modal from 'react-native-modal';
import CalendarDayComponent from './calendarDay';
import CalendarTemplate from '../../calendar/calendarTemplate';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SelectDaysModal = (props) => {
  const {visible, closeModal} = props;
  const {selectedDates, setSelectedDates} = props;
  const {setSelectedString} = props;
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => closeModal()}
      onBackButtonPress={() => closeModal()}>
      <View style={styles.dayModalContainer}>
        <Text style={styles.modalHeader}>Recurring Period</Text>
        <Text style={styles.modalDetails}>
          Select the recurring days for this medicine below
        </Text>
        <CalendarTemplate
          dayComponent={CalendarDayComponent}
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates}
          setSelectedString={setSelectedString}
          allowSelectAll={true}
          hideArrows={true}
        />
        <TouchableOpacity style={styles.confirmButton}>
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
    width: '80%',
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
