import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//third party lib
//components
import MenuBtn from '../../components/menuBtn';
import HeaderCard from '../../components/home/headerCard';
import CircularProgress from "../../components/dashboard/todayOverview/CircularProgress";
import ProgressBar from "../../components/progressbar";
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
//function
import {checkLogDone} from '../../commonFunctions/logFunctions';
import {getGreetingFromHour, getLastMinuteFromTodayDate, getTodayDate} from '../../commonFunctions/common';
import NotificationsCard from "../../components/dashboard/todayOverview/NotificationsCard";
import DiaryCard from "../../components/dashboard/todayOverview/DiaryCard";
import ActivityCard from "../../components/dashboard/todayOverview/ActivityCard";
import {requestNutrientConsumption} from "../../netcalls/mealEndpoints/requestMealLog";
import Moment from "moment";
import {getEntry4Day} from "../../netcalls/requestsDiary";

const buttonList = [
  {
    id: '1',
    name: 'Medications',
    path: 'Medication',
    iconName: 'capsules',
  },
  {
    id: '2',
    name: 'Rewards',
    path: 'GameCenter',
    iconName: 'gift',
  },
  {
    id: '3',
    name: 'Goals',
    path: 'Goals',
    iconName: 'empire',
  },
];

// properties
const username = 'Jimmy';
const {width, height} = Dimensions.get('window');

const LogsProgress = [
  {logName: 'Medication', progress: 0.33, path: 'MedicationLog'},
  {logName: 'Blood Glucose', progress: 1, path: 'BloodGlucoseLog'},
  {logName: 'Food', progress: 0.67, path: 'MealLogRoot'},
  {logName: 'Weight', progress: 0.33, path: 'WeightLog'},
]

const HomeScreen = (props) => {
  const [currHour, setCurrHour] = useState(new Date().getHours());
  const [uncompleteLogs, setUncompleteLogs] = useState([]);

  // diary card
  const [bgl, setBgl] = React.useState(null);
  const [calorie, setCalorie] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  // activity card
  const [protein, setProtein] = React.useState(null);
  const [carb, setCarb] = React.useState(null);
  const [fat, setFat] = React.useState(null);
  const [stepsTaken, setStepsTaken] = React.useState(null);

  useEffect(() => {
    //Refresh every 1 minutes
    setTimeout(() => {
      setCurrHour(new Date().getHours());
      checkLogDone(getGreetingFromHour(currHour)).then((response) => {
        setUncompleteLogs(response.notCompleted);
      });
    }, 60000);
  });

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      checkLogDone(getGreetingFromHour(currHour)).then((response) => {
        setUncompleteLogs(response.notCompleted);
      });

      // reload nutrition data
      requestNutrientConsumption(getTodayDate(), getLastMinuteFromTodayDate()).then(data => {
        const nutrientData = data.data;
        const calorieAmount = Math.round(nutrientData.reduce((acc, curr, index) => acc + curr.nutrients.energy.amount, 0));
        const proteinAmount = Math.round(nutrientData.reduce((acc, curr, index) => acc + curr.nutrients.protein.amount, 0));
        const carbAmount = Math.round(nutrientData.reduce((acc, curr, index) => acc + curr.nutrients.carbohydrate.amount, 0));
        const fatAmount = Math.round(nutrientData.reduce((acc, curr, index) => acc + curr.nutrients['total-fat'].amount, 0));
        setCalorie(calorieAmount);
        setProtein(proteinAmount);
        setCarb(carbAmount);
        setFat(fatAmount);
      });
      // reload diary data
      const d = Moment(new Date()).format("YYYY-MM-DD");
      getEntry4Day(d).then(data => {
        const bglLogs = data[d].glucose.logs;
        const weightLogs = data[d].weight.logs;
        const activityLogs = data[d].activity.logs;
        const steps = activityLogs.reduce((acc, curr, index) => acc + curr.steps, 0);
        let averageBgl = bglLogs.reduce((acc, curr, index) => acc + curr.bg_reading, 0);
        let averageWeight = weightLogs.reduce((acc, curr, index) => acc + curr.weight, 0);
        if (bglLogs.length > 0) {
          averageBgl = averageBgl / bglLogs.length;
          setBgl(averageBgl);
        }
        if (weightLogs.length > 0) {
          averageWeight = averageWeight / weightLogs.length;
          setWeight(averageWeight);
        }
        setStepsTaken(steps);
      });

    });
  }, []);
  return (
    <View
      style={[
        globalStyles.pageContainer,
        {backgroundColor: Colors.lastLogButtonColor},
      ]}>
      <MenuBtn green={true} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.backgroundColor,
        }}>
        {/* Greetings and log to do*/}
        <HeaderCard
          username={username}
          hour={getGreetingFromHour(currHour)}
          uncompleteLogs={uncompleteLogs}
        />
          {/* Notifications */}
          <NotificationsCard />
          {/* Diary overview of weight, blood glucose, food, medication and physical activity */}
          <DiaryCard bgl={bgl} calorie={calorie} weight={weight} />
          <ActivityCard stepsTaken={stepsTaken} carb={carb} protein={protein} fat={fat}/>
      </ScrollView>
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

export default HomeScreen;
