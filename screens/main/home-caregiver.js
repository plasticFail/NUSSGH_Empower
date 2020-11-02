import React, {useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
//third party lib
import Moment from 'moment';
//component
import MenuBtn from '../../components/menuBtn';
import HeaderCard from '../../components/home/headerCard';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
//function
import {checkLogDone} from '../../commonFunctions/logFunctions';
import {getGreetingFromHour, role_patient} from '../../commonFunctions/common';
import DailyCollapse from '../../components/home/collapsible/dailyCollapse';
import {getCaregiverProfile} from '../../netcalls/requestsAccount';
import {getRole} from '../../storage/asyncStorageFunctions';
import AssignedPatientCollapse from '../../components/home/collapsible/assignedPatientCollapse';
import PatientType from '../../components/home/collapsible/patientTypeCollapse';
import PatientInfo from '../../components/home/collapsible/patientInfo';

const patientSample = {
  name: 'Johnathan',
  gender: 'f',
  id: '-',
  dob: '1 Feb 1980',
  weight: 60,
};

const HomeScreenCaregiver = (props) => {
  const [caregiver, setCaregiver] = useState({});
  const [patient, setPatient] = useState({});
  const [currHour, setCurrHour] = useState(new Date().getHours());
  const [uncompleteLogs, setUncompleteLogs] = useState([]);

  //animation
  const slideRightAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    //slide right when enter screen
    props.navigation.addListener('focus', () => {
      slideRightAnimation.setValue(0);
      Animated.timing(slideRightAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [props.navigation]);

  const widthInterpolate = slideRightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width, 0],
    extrapolate: 'clamp',
  });

  //init
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getCaregiverProfile()
        .then((response) => {
          setCaregiver(response.caregiver);
          setPatient(response.patient);
        })
        .catch((err) => console.log(err));

      checkLogDone(getGreetingFromHour(currHour))
        .then((response) => {
          if (response != null) {
            setUncompleteLogs(response.notCompleted);
          }
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <View style={globalStyles.pageContainer}>
      <Animated.View
        style={[
          globalStyles.pageContainer,
          {
            backgroundColor: '#F5F6F9',
            transform: [{translateX: widthInterpolate}],
          },
        ]}>
        <View style={globalStyles.menuBarContainer}>
          <MenuBtn green={false} />
        </View>
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.backgroundColor,
          }}>
          {/* Greetings and log to do*/}
          <HeaderCard
            username={caregiver?.first_name}
            hour={getGreetingFromHour(currHour)}
          />

          <View style={{backgroundColor: 'transparent'}}>
            <AssignedPatientCollapse patient={patient} />
            <DailyCollapse
              uncompleteLogs={uncompleteLogs}
              hour={getGreetingFromHour(currHour)}
            />
            <PatientType patient={patient} />
            <PatientInfo patient={patient} />
          </View>

          {/* Diary overview of weight, blood glucose, food, medication and physical activity */}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  taskText: {
    fontFamily: 'SFProDisplay-Regular',
    color: 'white',
    marginStart: '5%',
    fontSize: 18,
  },
  bold: {
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
    marginStart: '5%',
    fontSize: 18,
  },
  logCard: {
    backgroundColor: 'white',
    borderRadius: 9.5,
    marginTop: '3%',
    marginStart: '5%',
    marginEnd: '5%',
    padding: '3%',
  },
  logLogo: {
    marginEnd: '3%',
    marginStart: '5%',
    marginTop: '3%',
  },
  usernameText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  buttonStyle: {
    backgroundColor: '#aad326',
    padding: '2%',
    borderRadius: 20,
    margin: '4%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  chevron: {
    marginTop: '5%',
    color: Colors.lastLogValueColor,
  },
});

export default HomeScreenCaregiver;
//edit flag
