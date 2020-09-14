import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
//third party lib
import {
  Svg,
  Text as SvgText,
  Circle,
  Rect,
  G,
  Defs,
  ClipPath,
} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
//components
import MenuBtn from '../../components/menuBtn';
import HeaderCard from '../../components/home/headerCard';
import NutritionIntakeCard from '../../components/dashboard/todayOverview/NutritionIntakeCard';
import DailyBloodSugarLevelBarChart from '../../components/dashboard/reports/DailyBloodSugarLevelBarChart';
import {getGreetingFromHour} from '../../commonFunctions/common';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
//function
import {checkLogDone} from '../../commonFunctions/logFunctions';

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
        <View style={{padding: padding}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <Svg width={width - 2 * padding} height={buttonSize}>
              {
                // Svg container for buttons
                buttonList.map((button, index) => {
                  return (
                    <G key={button.id}>
                      <Defs>
                        <ClipPath id={`clip-${index}`}>
                          <Circle
                            r={circleRadius}
                            x={
                              index *
                                (buttonSize +
                                  (width - 2 * padding - 3 * buttonSize) / 2) +
                              circleRadius -
                              circleXOffset
                            }
                            y={circleRadius - circleYOffset}
                          />
                        </ClipPath>
                      </Defs>
                      <Rect
                        width={buttonSize}
                        x={
                          index *
                          (buttonSize +
                            (width - 2 * padding - 3 * buttonSize) / 2)
                        }
                        rx={15}
                        height={buttonSize}
                        fill="#B2D04B"
                      />
                      <Rect
                        width={buttonSize}
                        x={
                          index *
                          (buttonSize +
                            (width - 2 * padding - 3 * buttonSize) / 2)
                        }
                        rx={15}
                        height={buttonSize}
                        fill="#C3DA6B"
                        clipPath={`url(#clip-${index})`}
                      />
                      <SvgText
                        x={
                          index *
                            (buttonSize +
                              (width - 2 * padding - 3 * buttonSize) / 2) +
                          textXOffset
                        }
                        fontSize={fontSize}
                        y={buttonSize - textYOffset}
                        fontWeight="bold"
                        fill="#fff">
                        {button.name}
                      </SvgText>
                    </G>
                  );
                })
              }
            </Svg>
            {
              // Icons for button
              buttonList.map((button, index) => {
                return (
                  <Icon
                    name={button.iconName}
                    color="#fff"
                    size={30}
                    style={{
                      position: 'absolute',
                      transform: [
                        {
                          translateX:
                            index *
                              (buttonSize +
                                (width - 2 * padding - 3 * buttonSize) / 2) +
                            circleXOffset,
                        },
                        {translateY: circleYOffset},
                      ],
                    }}
                  />
                );
              })
            }
          </View>
          <DailyBloodSugarLevelBarChart
            width={bloodGlucoseBarChartWidth}
            height={bloodGlucoseBarChartHeight}
          />
          <View>
            {/* Nutrition overview, activity overview, weight overview */}
            <NutritionIntakeCard
              onPress={() => alert('pressed nutrient card!')}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => props.navigation.navigate('MedicationPlan')}>
          <Text style={styles.buttonText}>Medication Plan (Alpha)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => props.navigation.navigate('FitbitSetup')}>
          <Text style={styles.buttonText}>Sync Fitbit (Alpha)</Text>
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
//comment
