import React from 'react';
import {View, Text} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import InProgress from '../../components/inProgress';

const AppointmentScreen = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Appointments</Text>
      <InProgress />
    </View>
  );
};

export default AppointmentScreen;
