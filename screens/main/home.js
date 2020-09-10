import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
//third party lib
//components
import MenuBtn from '../../components/menuBtn';
import HeaderCard from '../../components/home/headerCard';
import {getGreetingFromHour} from '../../commonFunctions/common';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
//function
import {checkLogDone} from '../../commonFunctions/logFunctions';
import DailyBloodSugarLevelBarChart from "../../components/dashboard/reports/DailyBloodSugarLevelBarChart";
import {WeightSlider} from "../../components/logs/weight/WeightSlider";
import Card from "../../components/common/Card";
import {backgroundColor} from "react-native-calendars/src/style";
import CircularProgress from "../../components/dashboard/todayOverview/CircularProgress";
import ProgressBar from "../../components/progressbar";

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
const buttonSize = width * 0.26;
const padding = 20;

// button list properties
const textXOffset = 10;
const textYOffset = 20;
const fontSize = 14.5;
const circleRadius = 0.35 * buttonSize;
const circleYOffset = 10;
const circleXOffset = 10;

const bloodGlucoseBarChartWidth = width - 2 * padding;
const bloodGlucoseBarChartHeight = height * 0.21;
const LogsProgress = [
  {logName: 'Medication', progress: 0.33, path: 'MedicationLog'},
  {logName: 'Blood Glucose', progress: 1, path: 'BloodGlucoseLog'},
  {logName: 'Food', progress: 0.67, path: 'MealLogRoot'},
  {logName: 'Weight', progress: 0.33, path: 'WeightLog'},
]

const HomeScreen = (props) => {
  const [currHour, setCurrHour] = useState(new Date().getHours());
  const [uncompleteLogs, setUncompleteLogs] = useState([]);
  useEffect(() => {
    //Refresh every 1 minutes
    setTimeout(() => setCurrHour(new Date().getHours()), 60000);
  });

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      checkLogDone(getGreetingFromHour(currHour)).then((response) => {
        setUncompleteLogs(response.notCompleted);
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
        <View style={{marginTop: padding}}>
            <View style={{height: 100, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
              <TouchableOpacity style={{width: '47.5%', height: '100%', backgroundColor: 'purple', borderRadius: 10, padding: 20}}
                                onPress={()=>props.navigation.navigate('GameCenter')}>
                <Text style={{color: '#fff', fontSize: 16}}>Points</Text>
                <Text style={{color: '#fff', fontSize: 30, textAlign: 'right', fontWeight: 'bold'}}>3500</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: '47.5%', height: '100%', backgroundColor: 'slateblue', borderRadius: 10, justifyContent: 'center', padding: 20}}
                                onPress={()=>props.navigation.navigate('EducationMaterials')}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Diabetes Management Guide</Text>
              </TouchableOpacity>
            </View>
            {/* Diary overview of weight, blood glucose, food, medication and physical activity */}
            {
              <View style={[styles.card, styles.shadow, {margin: 20, marginTop: 20, flexDirection: 'column', alignItems: 'flex-start'}]}>
                <View style={{borderBottomWidth: 0.5, borderColor: '#7d7d7d', width: '100%'}}>
                  <Text style={{padding: 20, fontWeight: 'bold', fontSize: 24, color: '#7d7d7d'}}>Overview</Text>
                </View>
                <View style={styles.overviewRow}>
                  <Text style={styles.metricText}>Blood Glucose</Text>
                  <Text style={styles.measuredText}>8 mmol/L</Text>
                </View>
                <View style={styles.overviewRow}>
                  <Text style={styles.metricText}>Nutrition</Text>
                  <Text style={styles.measuredText}>500 kcal</Text>
                </View>
                <View style={[styles.overviewRow, {borderBottomWidth: 0}]}>
                  <Text style={styles.metricText}>Weight</Text>
                  <Text style={styles.measuredText}>55.3 kg</Text>
                </View>
              </View>
            }
            {
              <View style={[styles.card, styles.shadow, {margin: 20, flexDirection: 'column', alignItems: 'center'}]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', borderBottomWidth: 0.5, borderColor: '#7d7d7d', padding: 20}}>
                  <View style={{width: '45%', alignItems: 'center'}}>
                    <CircularProgress color="#aad326" percent={0.2}
                                      centreComponent={{
                                        width: 40/2,
                                        height: 40/1.5,
                                        component: (
                                            <Icon name='walking' color='#aad326' size={40} />
                                        )
                                      }}
                                      radius={50} padding={5} strokeWidth={5} fontSize={15}/>
                    <Text style={{fontWeight: 'bold', color: '#7d7d7d', fontSize: 16}}>Steps</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>1000</Text>
                  </View>
                  <View style={{width: '45%', alignItems: 'center'}}>
                    <CircularProgress color="#aad326" percent={0.65}
                                      centreComponent={{
                                        width: 40/2,
                                        height: 40/1.5,
                                        component: (
                                            <Icon name='fire' color='#aad326' size={40} />
                                        )
                                      }}
                                      radius={50} padding={5} strokeWidth={5} fontSize={15}/>
                    <Text style={{fontWeight: 'bold', color: '#7d7d7d', fontSize: 16}}>Calories Burnt</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>350 kcal</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-between', width: '100%', padding: 20}}>
                  <View style={{width: '25%'}}>
                    <Text style={{fontWeight: 'bold', color: '#7d7d7d', paddingBottom: 5}}>Carbs</Text>
                    <ProgressBar containerStyle={{height: 7.5, width: '90%', marginBottom: 5}} progress={"33%"} useIndicatorLevel />
                    <Text style={{fontWeight: 'bold'}}>300 g</Text>
                  </View>
                  <View style={{width: '25%'}}>
                    <Text style={{fontWeight: 'bold', color: '#7d7d7d', paddingBottom: 5}}>Calorie</Text>
                    <ProgressBar containerStyle={{height: 7.5, width: '90%', marginBottom: 5}} progress={"33%"} useIndicatorLevel />
                    <Text style={{fontWeight: 'bold'}}>1500 kcal</Text>
                  </View>
                  <View style={{width: '25%'}}>
                    <Text style={{fontWeight: 'bold', color: '#7d7d7d', paddingBottom: 5}}>Fat</Text>
                    <ProgressBar containerStyle={{height: 7.5, width: '90%', marginBottom: 5}} progress={"33%"} useIndicatorLevel />
                    <Text style={{fontWeight: 'bold'}}>45 g</Text>
                  </View>
                </View>
              </View>
            }
        </View>
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

  // extra
  toDoText: {
    color:'#fff',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  progressText: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 3,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overviewRow: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 0.5,
    borderColor: '#7d7d7d',
    width: width - 80
  },
  metricText: {
    fontWeight: 'bold',
    color: '#7d7d7d'
  },
  measuredText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18
  }
});

export default HomeScreen;
