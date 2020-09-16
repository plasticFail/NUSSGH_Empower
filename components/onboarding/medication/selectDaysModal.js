import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
//third party library
import Modal from 'react-native-modal';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
//component
import CalendarDayComponent from './calendarDay';
import CalendarTemplate from '../../calendar/calendarTemplate';
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import CrossBtn from '../../crossBtn';
import {horizontalMargins} from '../../../styles/variables';

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
    <View>
      <Modal
        isVisible={visible}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View style={styles.dayModalContainer}>
          <View style={globalStyles.menuBarContainer}>
            <CrossBtn close={closeModal} />
          </View>
          <Text
            style={[
              globalStyles.pageHeader,
              {marginStart: horizontalMargins, marginBottom: '2%'},
            ]}>
            Recurring Period
          </Text>
          <Text
            style={[
              globalStyles.pageSubDetails,
              {marginStart: horizontalMargins},
            ]}>
            Select the recurring days for this medication below.
          </Text>
          <CalendarTemplate
            dayComponent={CalendarDayComponent}
            allowSelectAll={true}
            hideArrows={true}
            disableMonthChange={true}
            addSelectedDate={addSelectedDate}
            selectAll={selectAll}
            selectedDates41={selectedDates41}
            backgroundColor={Colors.backgroundColor}
          />
          <View style={{paddingBottom: '4%'}} />
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              style={globalStyles.nextButtonStyle}
              onPress={handleConfirm}>
              <Text style={globalStyles.actionButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectDaysModal;

const styles = StyleSheet.create({
  dayModalContainer: {
    backgroundColor: Colors.backgroundColor,
  },
});
