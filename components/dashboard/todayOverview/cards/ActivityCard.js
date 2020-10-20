import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  maxSteps,
  maxCalBurnt,
} from '../../../../commonFunctions/diaryFunctions';
//component
import CircularProgress from '../CircularProgress';
//third party lib
import Icon from 'react-native-vector-icons/FontAwesome5';

import STEP_lg from '../../../../resources/images/Patient-Icons/SVG/icon-lightgreen-steps-home.svg';
import RUN_lg from '../../../../resources/images/Patient-Icons/SVG/icon-lightgreen-running-home.svg';
import CALBURNT_lg from '../../../../resources/images/Patient-Icons/SVG/icon-lightgreen-calburnt-home.svg';
import NutritionCol from '../../../home/nutritionCol';
import {protein, carbs, fats} from '../../../../commonFunctions/common';

const logoStyle = {
  width: 50,
  height: 50,
};

export default function ActivityCard(props) {
  const {
    stepsTaken,
    carbAmt,
    proteinAmt,
    fatAmt,
    activitySummary,
    activityTarget,
  } = props;
  const navigation = useNavigation();

  console.log('in activity card');

  return (
    <View style={[styles.card, styles.shadow]}>
      <TouchableOpacity
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          paddingStart: '2%',
          paddingEnd: '2%',
        }}
        onPress={() => navigation.navigate('Reports', {initialTab: 4})}>
        <View style={styles.activityCircular}>
          <CircularProgress
            color="#aad326"
            percent={activitySummary?.steps / maxSteps}
            centreComponent={{
              width: 50 / 2,
              height: 50 / 1.5,
              component: <STEP_lg {...logoStyle} />,
            }}
            radius={50}
            padding={10}
            strokeWidth={5}
            fontSize={15}
            remainingStrokeColor={'#e2e8ee'}
          />
          <Text style={styles.activityCount}>{activitySummary?.steps}</Text>
          <Text style={styles.activityParam}>Steps</Text>
        </View>
        <View style={styles.activityCircular}>
          <CircularProgress
            color="#aad326"
            percent={activitySummary?.duration / activityTarget}
            centreComponent={{
              width: 50 / 2,
              height: 50 / 1.5,
              component: <RUN_lg {...logoStyle} />,
            }}
            radius={50}
            padding={10}
            strokeWidth={5}
            fontSize={15}
            remainingStrokeColor={'#e2e8ee'}
          />
          <Text style={styles.activityCount}>{activitySummary?.duration}</Text>
          <Text style={styles.activityParam}>Mins</Text>
        </View>
        <View style={styles.activityCircular}>
          <CircularProgress
            color="#aad326"
            percent={activitySummary?.calories / maxCalBurnt}
            centreComponent={{
              width: 50 / 2,
              height: 50 / 1.5,
              component: <CALBURNT_lg {...logoStyle} />,
            }}
            radius={50}
            padding={10}
            strokeWidth={5}
            fontSize={15}
            remainingStrokeColor={'#e2e8ee'}
          />
          <Text style={styles.activityCount}>{activitySummary?.calories}</Text>
          <Text style={styles.activityParam}>Cal Burnt</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.whiteborder} />
      <TouchableOpacity
        style={{justifyContent: 'space-around', flexDirection: 'row'}}
        onPress={() => navigation.navigate('Reports', {initialTab: 1})}>
        <NutritionCol amount={carbAmt} nutrientType={carbs} header="Carbs" />
        <NutritionCol amount={fatAmt} nutrientType={fats} header="Fat" />
        <NutritionCol
          amount={proteinAmt}
          nutrientType={protein}
          header="Protein"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: '7%',
    margin: '4%',
    paddingBottom: '2%',
    paddingTop: '3%',
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
  activityCircular: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  activityCount: {
    fontFamily: 'SFProDisplay-Bold',
    color: '#aad326',
    fontSize: 20,
  },
  activityParam: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    color: '#3c3c43',
  },
  whiteborder: {
    borderBottomColor: '#e1e7ed',
    borderBottomWidth: 2,
    margin: '4%',
  },
});
