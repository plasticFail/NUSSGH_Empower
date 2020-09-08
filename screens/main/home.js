import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//third party lib
import {
  Svg,
  Text as SvgText,
  Circle,
  Image,
  Rect,
  G,
  Defs,
  ClipPath,
} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
//components
import MenuBtn from '../../components/menuBtn';
import NutritionIntakeCard from '../../components/dashboard/todayOverview/NutritionIntakeCard';
import DailyBloodSugarLevelBarChart from '../../components/dashboard/reports/DailyBloodSugarLevelBarChart';
import {getGreetingFromHour} from '../../commonFunctions/common';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';

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
  const [currHour, setCurrHour] = React.useState(new Date().getHours());
  React.useEffect(() => {
    //Refresh every 1 minutes
    setTimeout(() => setCurrHour(new Date().getHours()), 60000);
  });

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
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: Colors.lastLogButtonColor,
            paddingBottom: '3%',
          }}>
          <Text style={styles.greetingText}>
            Good {getGreetingFromHour(currHour)},
          </Text>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
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
    fontSize: 24,
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
  },
  usernameText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'SFProDisplay-Bold',
    marginStart: '5%',
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
});

export default HomeScreen;
