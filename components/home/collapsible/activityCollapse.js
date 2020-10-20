import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import {Colors} from '../../../styles/colors';
import {maxSteps} from '../../../commonFunctions/diaryFunctions';
import CircularProgress from '../../dashboard/todayOverview/CircularProgress';

import STEP from '../../../resources/images/Patient-Icons/SVG/icon-darkgreen-steps-home.svg';
import RUN from '../../../resources/images/Patient-Icons/SVG/icon-darkgreen-running-home.svg';
import CALBURNT from '../../../resources/images/Patient-Icons/SVG/icon-darkgreen-calburnt-home.svg';
import ProgressBar from '../../progressbar';
import {
  carbs,
  renderNutrientPercent,
  fats,
  protein,
} from '../../../commonFunctions/common';
import NutritionCol from './nutritionCol';

const logoStyle = {
  width: 50,
  height: 50,
};

const ActivityCollapse = (props) => {
  const {activitySummary, activityTarget, carbAmt, proteinAmt, fatAmt} = props;
  const [open, setOpen] = useState(true);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const dropDownAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setOpen(true);
  }, []);

  const toggle = (visible) => {
    if (visible) {
      Animated.timing(dropDownAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.timing(dropDownAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const heightInterpolation = dropDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [minHeight, maxHeight],
  });

  return (
    <View
      onLayout={(event) => setMaxHeight(event.nativeEvent.layout.height)}
      style={{backgroundColor: Colors.dailyTab}}>
      <View
        style={styles.cardTab}
        onLayout={(event) => setMinHeight(event.nativeEvent.layout.height)}>
        <TouchableOpacity
          onPress={() => {
            toggle(open);
          }}
          style={styles.headerTab}>
          <Text style={[styles.headerText, {flex: 1}]}>
            {'Activity & Food Intake'}
          </Text>
        </TouchableOpacity>
      </View>
      {/*Content */}
      {open && (
        <Animated.View
          style={{
            maxHeight: heightInterpolation,
            backgroundColor: Colors.activityTab,
            paddingBottom: '2%',
          }}>
          <>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={styles.activityCircular}>
                <CircularProgress
                  color="#005c30"
                  percent={activitySummary?.steps / maxSteps}
                  centreComponent={{
                    width: 50 / 2,
                    height: 50 / 1.5,
                    component: <STEP {...logoStyle} />,
                  }}
                  radius={50}
                  padding={10}
                  strokeWidth={5}
                  fontSize={15}
                />
                <Text style={styles.activityCount}>
                  {activitySummary?.steps}
                </Text>
                <Text style={styles.activityParam}>Steps</Text>
              </View>
              <View style={styles.activityCircular}>
                <CircularProgress
                  color="#005c30"
                  percent={activitySummary?.duration / activityTarget}
                  centreComponent={{
                    width: 50 / 2,
                    height: 50 / 1.5,
                    component: <RUN {...logoStyle} />,
                  }}
                  radius={50}
                  padding={10}
                  strokeWidth={5}
                  fontSize={15}
                />
                <Text style={styles.activityCount}>
                  {activitySummary?.duration}
                </Text>
                <Text style={styles.activityParam}>Mins</Text>
              </View>
              <View style={styles.activityCircular}>
                <CircularProgress
                  color="#005c30"
                  percent={activitySummary?.duration / activityTarget}
                  centreComponent={{
                    width: 50 / 2,
                    height: 50 / 1.5,
                    component: <CALBURNT {...logoStyle} />,
                  }}
                  radius={50}
                  padding={10}
                  strokeWidth={5}
                  fontSize={15}
                />
                <Text style={styles.activityCount}>
                  {activitySummary?.calories}
                </Text>
                <Text style={styles.activityParam}>Cal Burnt</Text>
              </View>
            </View>
            <View style={styles.whiteborder} />
            <View
              style={{justifyContent: 'space-around', flexDirection: 'row'}}>
              <NutritionCol
                amount={carbAmt}
                nutrientType={carbs}
                header="Carbs"
              />
              <NutritionCol amount={fatAmt} nutrientType={fats} header="Fat" />
              <NutritionCol
                amount={proteinAmt}
                nutrientType={protein}
                header="Protein"
              />
            </View>
          </>
        </Animated.View>
      )}
    </View>
  );
};

export default ActivityCollapse;

const styles = StyleSheet.create({
  cardTab: {
    backgroundColor: Colors.activityTab,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  headerTab: {
    padding: '3%',
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'SFProDisplay-Bold',
    color: '#21293a',
    fontSize: 18,
    marginStart: '3%',
  },
  greetingText: {
    color: '#005c30',
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
  activityCircular: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  activityCount: {
    fontFamily: 'SFProDisplay-Bold',
    color: '#005c30',
    fontSize: 20,
  },
  activityParam: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
  },
  whiteborder: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    margin: '3%',
  },
});
