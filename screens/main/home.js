import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
//third party lib
//components
import MenuBtn from '../../components/menuBtn';
import HeaderCard from '../../components/home/headerCard';
import CircularProgress from '../../components/dashboard/todayOverview/CircularProgress';
import ProgressBar from '../../components/progressbar';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
//function
import {checkLogDone} from '../../commonFunctions/logFunctions';
import {
  getGreetingFromHour,
  getLastMinuteFromTodayDate,
  getTodayDate,
} from '../../commonFunctions/common';
import NotificationsCard from '../../components/dashboard/todayOverview/cards/NotificationsCard';
import DiaryCard from '../../components/dashboard/todayOverview/cards/DiaryCard';
import ActivityCard from '../../components/dashboard/todayOverview/cards/ActivityCard';
import {requestNutrientConsumption} from '../../netcalls/mealEndpoints/requestMealLog';
import Moment from 'moment';
import {getEntry4Day} from '../../netcalls/requestsDiary';
import logStyles from '../../styles/logStyles';
import {
  checkMedTaken4Day,
  getMedDonePeriods,
  renderGreetingText,
} from '../../commonFunctions/diaryFunctions';

// properties
const username = 'Jimmy';
const {width, height} = Dimensions.get('window');
const today_date = Moment(new Date()).format('YYYY-MM-DD');
const dateString = Moment(new Date()).format('DD MMM YYYY');

const maxCarbs = 150; //grams
const maxProtein = 112; //grams
const maxFats = 50; //grams

const HomeScreen = (props) => {
  const [currHour, setCurrHour] = useState(new Date().getHours());
  const [uncompleteLogs, setUncompleteLogs] = useState([]);

  // diary card
  const [bgl, setBgl] = React.useState(null);
  const [calorie, setCalorie] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  const [med, setMed] = React.useState('');

  const [bgLogs, setBgLogs] = useState([]);
  const [bgPass, setBgPass] = useState(false);
  const [bgMiss, setBgMiss] = useState(false);
  const [foodLogs, setFoodLogs] = useState([]);
  const [foodPass, setFoodPass] = useState(true);
  const [medLogs, setMedLogs] = useState([]);
  const [weightLogs, setWeightLogs] = useState([]);

  // activity card
  const [protein, setProtein] = React.useState(null);
  const [carb, setCarb] = React.useState(null);
  const [fat, setFat] = React.useState(null);
  const [stepsTaken, setStepsTaken] = React.useState(null);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      checkLogDone(getGreetingFromHour(currHour))
        .then((response) => {
          if (response != undefined) {
            setUncompleteLogs(response.notCompleted);
          }
        })
        .catch((err) => console.log(err));
      initLogs();
      loadNutritionalData();
    });
  }, [bgLogs]);

  const initLogs = () => {
    getEntry4Day(today_date)
      .then((data) => {
        if (data != undefined) {
          const bglLogs = data[today_date].glucose.logs;
          const weightLogs = data[today_date].weight.logs;
          const foodLogs = data[today_date].food.logs;
          const activityLogs = data[today_date].activity.logs;
          const medLogs = data[today_date].medication.logs;
          const bgTarget = data[today_date].glucose.target;
          //set logs
          setBgLogs(bglLogs);
          setFoodLogs(foodLogs);
          setMedLogs(medLogs);
          setWeightLogs(weightLogs);

          //evalulate logs
          const steps = activityLogs.reduce(
            (acc, curr, index) => acc + curr.steps,
            0,
          );
          let averageBgl = bglLogs.reduce(
            (acc, curr, index) => acc + curr.bg_reading,
            0,
          );
          let averageWeight = weightLogs.reduce(
            (acc, curr, index) => acc + curr.weight,
            0,
          );
          if (bglLogs.length > 0) {
            averageBgl = Math.round((averageBgl * 100) / bglLogs.length) / 100;
            setBgl(averageBgl);
            if (bgTarget.comparator === '<=') {
              if (averageBgl <= bgTarget.value) {
                setBgPass(true);
              }
            }
            if (bgTarget.comparator === '>=') {
              if (averageBgl >= bgTarget.value) {
                setBgPass(true);
              }
            }
          } else {
            setBgMiss(true);
          }

          if (weightLogs.length > 0) {
            averageWeight =
              Math.round((averageWeight * 100) / weightLogs.length) / 100;
            setWeight(averageWeight);
          } else {
          }
          setStepsTaken(steps);

          //for med data log
          if (medLogs.length === 0) {
            setMed('Missed');
          } else {
            checkMedTaken4Day(medLogs, today_date).then((response) => {
              if (response === false) {
                //med not completed
                let arr = getMedDonePeriods(medLogs);
                let greetings = 'Taken in the ' + renderGreetingText(arr);
                setMed(greetings);
              } else {
                setMed('Completed');
              }
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const loadNutritionalData = () => {
    // reload nutrition data
    requestNutrientConsumption(getTodayDate(), getLastMinuteFromTodayDate())
      .then((data) => {
        const nutrientData = data.data;
        const calorieAmount = Math.round(
          nutrientData.reduce(
            (acc, curr, index) => acc + curr.nutrients.energy.amount,
            0,
          ),
        );
        const proteinAmount = Math.round(
          nutrientData.reduce(
            (acc, curr, index) => acc + curr.nutrients.protein.amount,
            0,
          ),
        );
        const carbAmount = Math.round(
          nutrientData.reduce(
            (acc, curr, index) => acc + curr.nutrients.carbohydrate.amount,
            0,
          ),
        );
        const fatAmount = Math.round(
          nutrientData.reduce(
            (acc, curr, index) => acc + curr.nutrients['total-fat'].amount,
            0,
          ),
        );
        setCalorie(calorieAmount);
        setProtein(proteinAmount);
        setCarb(carbAmount);
        setFat(fatAmount);

        if (fat > maxFats && carb > maxCarbs && protein > maxProtein) {
          setFoodPass(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View
      style={[
        globalStyles.pageContainer,
        {backgroundColor: Colors.lastLogButtonColor},
      ]}>
      <View style={globalStyles.menuBarContainer}>
        <MenuBtn green={true} />
        <View style={{flex: 1}} />
      </View>
      <ScrollView
        bounces={Platform.OS === 'ios' && false}
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
        <DiaryCard
          today_date={today_date}
          bgl={bgl}
          calorie={calorie}
          weight={weight}
          medResult={med}
          bgLogs={bgLogs}
          bgPass={bgPass}
          bgMiss={bgMiss}
          dateString={dateString}
          foodLogs={foodLogs}
          carbs={carb}
          fats={fat}
          foodPass={foodPass}
          protein={protein}
          weightLogs={weightLogs}
          medLogs={medLogs}
          init={() => initLogs()}
        />
        <ActivityCard
          stepsTaken={stepsTaken}
          carb={carb}
          protein={protein}
          fat={fat}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MedicationPlan')}
          style={[globalStyles.nextButtonStyle, {marginBottom: 0}]}>
          <Text style={globalStyles.actionButtonText}>
            Medication Plan Alpha
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.nextButtonStyle}
          onPress={() => props.navigation.navigate('FitbitSetup')}>
          <Text style={globalStyles.actionButtonText}>Fitbit Sync Alpha</Text>
        </TouchableOpacity>
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
//edit flag
