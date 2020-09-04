import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  ScrollView,
  FlatList,
} from 'react-native-gesture-handler';
import {Svg, Text as SvgText, Circle, Image, Rect, G, Defs, ClipPath} from "react-native-svg";
import NutritionIntakeCard from '../../components/dashboard/todayOverview/NutritionIntakeCard';
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
    iconName: 'capsules'
  },
  {
    id: '2',
    name: 'Rewards',
    path: 'GameCenter',
    iconName: 'gift'
  },
  {
    id: '3',
    name: 'Goals',
    path: 'Goals',
    iconName: 'empire'
  }
];

function getGreetingFromHour(hour) {
  if (hour > 4 && hour < 12) {
    return "Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Afternoon";
  } else if (hour >= 18 && hour < 22) {
    return "Evening";
  } else {
    return "Night";
  }
}

// properties
const username = "Jimmy";
const {width, height} = Dimensions.get('window');

const LogsProgress = [
  {logName: 'Medication', progress: 0.33, path: 'MedicationLog'},
  {logName: 'Blood Glucose', progress: 1, path: 'BloodGlucoseLog'},
  {logName: 'Food', progress: 0.67, path: 'MealLogRoot'},
  {logName: 'Weight', progress: 0.33, path: 'WeightLog'},
]

const HomeScreen = (props) => {
  const [currHour, setCurrHour] = React.useState(new Date().getHours());
  React.useEffect(() => {
    //Refresh every 1 minutes
    setTimeout(() => setCurrHour(new Date().getHours()), 60000);
  })

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: 'white',
      }}>
      <View style={{justifyContent: 'center', paddingLeft: 20, paddingRight: 20, paddingBottom: 20, backgroundColor: '#4EA75A'}}>
        <Text style={styles.greetingText}>
          {getGreetingFromHour(currHour)}
        </Text>
        <Text style={styles.usernameText}>{username}</Text>
        <Text style={styles.toDoText}>Completed logs today:</Text>
        <View style={[styles.card, styles.shadow]}>
          {
            LogsProgress.map((log, index) => (
                <TouchableOpacity key={log.logName}
                                  onPress={()=>props.navigation.navigate(log.path)}
                                  style={{borderRightWidth: index === 3 ? 0 : 0.5, flex: 1, height: 70, paddingLeft: 10, marginTop: 10, marginBottom: 10, borderColor: '#7d7d7d7d'}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={[styles.progressText, {color: log.progress <= 0.33 ? 'red' : log.progress <= 0.67 ? 'orange' : 'green'}]}>{getFracFromPercent(log.progress, 3)}</Text>
                    <Text style={{fontWeight: 'bold', color: '#7d7d7d', fontSize: log.logName.length > 10 ? 11: 14}}>{log.logName}</Text>
                  </View>
                  <ProgressBar containerStyle={{height: 7.5, width: '90%', marginBottom: 5}} progress={log.progress * 100 + "%"} useIndicatorLevel reverse />
                </TouchableOpacity>
            ))
          }
        </View>
      </View>
      <View style={{paddingTop: 10}}>
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
  );
};

function getFracFromPercent(perc, denom) {
  return `${Math.round(perc * denom)} / ${denom}`;
}

const styles = StyleSheet.create({
  greetingText: {
    color: '#222939',
    fontSize: 20,
    fontWeight: 'bold'
  },
  usernameText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
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
