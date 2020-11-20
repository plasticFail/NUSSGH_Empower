import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import globalStyles from '../../styles/globalStyles';
//component
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import PartialNFullCalendar from '../../components/partialNFullCalendar';
//third party lib
import Moment from 'moment';
//function
import {get3DayB4NAfter} from '../../commonFunctions/common';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';
import AppointmentContainer from '../../components/appointmentContainer';

const appointments = [
  {
    date: '10/11/2020 ',
    title: 'Chat with Dr. Andrew',
    startTime: '12:00 PM',
    endTime: '2:00 PM',
    sessionId: 3,
  },
];

const AppointmentScreen = (props) => {
  const today_date = Moment(new Date()).format('YYYY-MM-DD');

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today_date); //to be used to get appointment*

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setDates(get3DayB4NAfter(new Date(today_date)));
    });
  }, []);

  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Appointments</Text>
      <PartialNFullCalendar
        today_date={today_date}
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setDates={setDates}
        allowBeyondToday={true}
      />
      <Text style={[globalStyles.pageDetails, styles.upcomingAppointment]}>
        Upcoming Appointment
      </Text>
      <ScrollView contentContainerStyle={{flexGrow: 0}}>
        {appointments.map((item, index) => (
          <AppointmentContainer
            key={index}
            date={item.date}
            title={item.title}
            startTime={item.startTime}
            endTime={item.endTime}
            sessionId={item.sessionId}
            type={'chat'}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  upcomingAppointment: {
    fontSize: adjustSize(23),
    opacity: 0.6,
  },
});
