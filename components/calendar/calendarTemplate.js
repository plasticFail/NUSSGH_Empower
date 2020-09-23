import React, {useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
//third party library
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {Colors} from '../../styles/colors';

//Props:
//dayComponent: pass a component to render the styling for each day
//allowSelectAll : option to select all
//hideArrow: put true for option to show other months
//monthChange: boolean true false
//addSelectedDate: call back function to act on get selected date string
//selectAll: callback function to act on all dates selected for the month*
const CalendarTemplate = (props) => {
  const {
    dayComponent,
    allowSelectAll,
    hideArrows,
    monthChange,
    selectedDates41,
    backgroundColor,
    headerStyle,
  } = props;
  const {addSelectedDate, selectAll} = props;
  return (
    <>
      <Calendar
        dayComponent={dayComponent}
        current={new Date()}
        hideExtraDays={true}
        hideArrows={hideArrows}
        disableMonthChange={monthChange}
        onDayPress={(day) => {
          console.log('Adding selected day', day);
          addSelectedDate(day.dateString);
        }}
        markedDates={selectedDates41}
        markingType={'custom'}
        selectAll={allowSelectAll}
        setSelectAll={selectAll}
        theme={{
          calendarBackground: Colors.backgroundColor,
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              marginTop: 6,
              alignItems: 'center',
              marginStart: '2%',
            },
            headerContainer: {
              width: '80%',
              flexDirection: 'row',
            },
            monthText: {
              fontSize: 20,
              fontFamily: 'SFProDisplay-Bold',
              textAlign: 'center',
            },
          },
          arrowColor: Colors.lastLogValueColor,
        }}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: '31%', left: '75%'}}
        onPress={() => selectAll()}>
        <Text style={styles.selectAllText}>Select All</Text>
      </TouchableOpacity>
    </>
  );
};

export default CalendarTemplate;

//comment
const styles = StyleSheet.create({
  selectAllText: {
    fontSize: 20,
    fontFamily: 'SFProDisplay-Bold',
    color: '#aad326',
  },
});
