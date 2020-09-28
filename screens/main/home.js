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
import NotificationsCard from '../../components/dashboard/todayOverview/cards/NotificationsCard';
import DiaryCard from '../../components/dashboard/todayOverview/cards/DiaryCard';
import ActivityCard from '../../components/dashboard/todayOverview/cards/ActivityCard';
import MenuBtn from '../../components/menuBtn';
import HeaderCard from '../../components/home/headerCard';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
//function
import {checkLogDone, isToday} from '../../commonFunctions/logFunctions';
import {requestNutrientConsumption} from '../../netcalls/mealEndpoints/requestMealLog';
import {
  getGreetingFromHour,
  getLastMinuteFromTodayDate,
  getTodayDate,
  appointment,
  howTo,
  checkLast7Day,
} from '../../commonFunctions/common';
import {getEntry4Day} from '../../netcalls/requestsDiary';
import {
  checkMedTaken4Day,
  getMedDonePeriods,
  renderGreetingText,
} from '../../commonFunctions/diaryFunctions';
import GameCard from '../../components/home/gameCard';
import {getLastWeightLog} from '../../storage/asyncStorageFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import {key_weightLog} from '../../storage/asyncStorageFunctions';

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
  const [lastWeight, setLastWeight] = useState('');

  // activity card
  const [protein, setProtein] = React.useState(null);
  const [carb, setCarb] = React.useState(null);
  const [fat, setFat] = React.useState(null);
  const [stepsTaken, setStepsTaken] = React.useState(null);

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

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      checkLogDone(getGreetingFromHour(currHour))
        .then((response) => {
          if (response != null) {
            setUncompleteLogs(response.notCompleted);
          }
        })
        .catch((err) => console.log(err));
      initLogs();
    });
  }, []);

  const initLogs = async () => {
    checkLogDone(getGreetingFromHour(currHour)).then((response) => {
      if (response != null) {
        setUncompleteLogs(response.notCompleted);
      }
    });

    getEntry4Day(today_date)
      .then((data) => {
        if (data != undefined) {
          const bglLogs = data[today_date].glucose.logs;
          const weightLogs = data[today_date].weight.logs;
          const foodLogs = data[today_date].food.logs;
          const activityLogs = data[today_date].activity.logs;
          const medLogs = data[today_date].medication.logs;
          const bgTarget = data[today_date].glucose.target;
          //set logs need to pass to diary card*
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
            setBgl(null);
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

    let weight_data = await getLastWeightLog();
    if (weight_data != null) {
      if (!checkLast7Day(weight_data)) {
        setLastWeight('Not taken yet');
      } else {
        if (isToday(weight_data.date)) {
          setLastWeight('Taken today.');
        } else {
          //weight exist in last 7 days
          let today = Moment(new Date());
          let takenDate = Moment(weight_data.date);
          let diff = today.diff(takenDate, 'days');
          setLastWeight('Logged ' + diff + ' day (s) ago.');
        }
      }
    } else {
      //if last weight log dont exist,
      setLastWeight('Not taken yet');
    }

    loadNutritionalData();
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
    <View style={globalStyles.pageContainer}>
      <Animated.View
        style={[
          globalStyles.pageContainer,
          {
            backgroundColor: Colors.lastLogButtonColor,
            transform: [{translateX: widthInterpolate}],
          },
        ]}>
        <View style={globalStyles.menuBarContainer}>
          <MenuBtn green={true} />
          <View style={{flex: 1}} />
        </View>
        <ScrollView
          bounces={false}
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
          <NotificationsCard type={howTo} count={''} />
          <NotificationsCard type={appointment} count={'2'} />
          <ActivityCard
            stepsTaken={stepsTaken}
            carb={carb}
            protein={protein}
            fat={fat}
          />
          <GameCard points={'5'} chances={'2'} rewardCount={'2'} />
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
            lastWeight={lastWeight}
            init={() => initLogs()}
          />
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

export default HomeScreen;
//edit flag
