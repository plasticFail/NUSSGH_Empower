import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import {Svg, Text as SvgText, Circle, Image, Rect, G, Defs, ClipPath} from "react-native-svg";
import NutritionIntakeCard from '../../components/dashboard/todayOverview/NutritionIntakeCard';
import DailyBloodSugarLevelBarChart from "../../components/dashboard/reports/DailyBloodSugarLevelBarChart";

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
const buttonSize = width * 0.26;
const padding = 20;

// button list properties
const textXOffset = 10;
const textYOffset = 20;
const fontSize = 14.5;
const circleRadius = 0.35 * buttonSize;
const circleYOffset = 10
const circleXOffset = 10;

const bloodGlucoseBarChartWidth = width - 2 * padding;
const bloodGlucoseBarChartHeight = height * 0.21;

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
        padding: padding
      }}>
      <View style={{height: '10%', justifyContent: 'center'}}>
        <Text style={styles.greetingText}>
          {getGreetingFromHour(currHour)} <Text style={styles.usernameText}>{username}</Text>
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20}}>
        <Svg width={width- 2 * padding} height={buttonSize}>
          { // Svg container for buttons
            buttonList.map((button, index) => {
                return (<G key={button.id}>
                      <Defs>
                        <ClipPath id={`clip-${index}`}>
                          <Circle r={circleRadius}
                                  x={index * (buttonSize + (width - 2 * padding - 3 * (buttonSize))/ 2)
                                  + circleRadius - circleXOffset}
                                  y={circleRadius - circleYOffset}
                          />
                        </ClipPath>
                      </Defs>
                      <Rect
                          width={buttonSize}
                          x={index * (buttonSize + (width - 2 * padding - 3 * (buttonSize))/ 2)}
                          rx={15}
                          height={buttonSize}
                          fill='#B2D04B'
                      />
                      <Rect
                          width={buttonSize}
                          x={index * (buttonSize + (width - 2 * padding - 3 * (buttonSize))/ 2)}
                          rx={15}
                          height={buttonSize}
                          fill='#C3DA6B'
                          clipPath={`url(#clip-${index})`}
                      />
                      <SvgText x={index * (buttonSize + (width - 2 * padding - 3 * (buttonSize))/ 2) + textXOffset}
                               fontSize={fontSize}
                               y={buttonSize - textYOffset}
                               fontWeight='bold'
                               fill='#fff'>
                        {button.name}
                      </SvgText>
                    </G>
                )
              }
            )
          }
        </Svg>
        { // Icons for button
          buttonList.map((button, index) => {
            return (<Icon name={button.iconName} color='#fff'
                          size={30}
                          style={{
                            position: 'absolute',
                            transform: [
                              {translateX: index * (buttonSize + (width - 2 * padding - 3 * (buttonSize)) / 2) + circleXOffset},
                              {translateY: circleYOffset}]
                          }}/>)
          })
        }
      </View>
      <DailyBloodSugarLevelBarChart width={bloodGlucoseBarChartWidth}
                                    height={bloodGlucoseBarChartHeight} />
      <View>
        {/* Nutrition overview, activity overview, weight overview */}
        <NutritionIntakeCard onPress={() => alert('pressed nutrient card!')} />
      </View>
      <Button
        title="Medicine Plan "
        onPress={() => props.navigation.navigate('MedicationPlan')}
      />
      <Button title="Sync fitbit" onPress={() => props.navigation.navigate('FitbitSetup')}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  greetingText: {
    color: '#222939',
    fontSize: 32,
    fontWeight: 'bold'
  },
  usernameText: {
    color: '#B2D14A'
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
});

export default HomeScreen;
