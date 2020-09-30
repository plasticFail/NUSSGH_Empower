import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
  Easing,
} from 'react-native';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import {horizontalMargins} from '../../styles/variables';
//component
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import ProgressBar from '../../components/progressbar';
//third party lib
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddGoalModal from '../../components/goals/addGoalModal';
import Icon from 'react-native-vector-icons/FontAwesome5';

import dummyData from '../../components/goals/dummyData.json';

import {
  bg_key,
  renderLogIconNavy,
  food_key,
  med_key,
  weight_key,
  activity_key,
  step_key,
} from '../../commonFunctions/logFunctions';
import CHEV_RIGHT from '../../resources/images/Patient-Icons/SVG/icon-grey-chevron-right.svg';

//key in goal json
const bg = 'blood_glucose';
const food = 'food';
const med = 'medication';
const weight = 'weight';
const activity = 'activity';
const steps = 'steps';

const height = Dimensions.get('window').height;

const GoalsScreen = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [goals, setGoals] = useState({});
  const [showDown, setShowDown] = useState(true);
  const moveDownAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setGoals(dummyData);
    if (showDown) {
      runAnimation();
    }
  }, [showDown]);

  const runAnimation = () => {
    setShowDown(true);
    Animated.loop(
      Animated.timing(moveDownAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  };

  const removeAnimation = () => {
    setShowDown(false);
    moveDownAnimation.setValue(0);
  };

  const heightInterpolation = moveDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.5, height * 0.6],
  });

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 30
    );
  };

  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    return contentOffset.y == 0;
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Goals</Text>
      <Text style={[globalStyles.pageDetails, {marginBottom: '4%'}]}>
        Edit Your Targets
      </Text>
      <Text style={[globalStyles.goalFieldName]}>Your Goals</Text>
      <ScrollView
        style={{height: '1%'}}
        scrollEventThrottle={100}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            return removeAnimation();
          } else {
            setShowDown(true);
          }
        }}>
        {RenderGoalItems(goals)}
      </ScrollView>
      {showDown && (
        <Animated.View
          style={[
            {transform: [{translateY: heightInterpolation}]},
            {position: 'absolute', right: '2%'},
          ]}>
          <Icon
            name="arrow-circle-down"
            size={40}
            color={Colors.lastLogButtonColor}
            style={styles.downIcon}
          />
        </Animated.View>
      )}

      <TouchableOpacity
        onPress={() => setOpenAdd(true)}
        style={{flexDirection: 'row'}}>
        <AntDesign
          name="pluscircleo"
          color={'#aad326'}
          size={25}
          style={{margin: '2%'}}
        />
        <Text style={styles.addbutton}>Add Goal</Text>
      </TouchableOpacity>
      <View style={{flex: 1}} />
      <AddGoalModal visible={openAdd} close={() => setOpenAdd(false)} />
    </View>
  );
};

export default GoalsScreen;

function RenderGoalItems(array) {
  return Object.keys(array).map((item, index) =>
    array[item].map((goal, index) => {
      return (
        <View key={index} style={[{flex: 1}, styles.border]}>
          {renderGoalType(goal, item)}
        </View>
      );
    }),
  );
}

function renderGoalType(goalItem, type) {
  let progress = goalItem.progress + '%';
  return (
    <TouchableOpacity
      style={{
        margin: '3%',
        flexDirection: 'row',
      }}>
      {renderGoalLogo(type)}
      <View style={{flex: 1}}>
        <Text style={styles.goalType}>{renderGoalTypeName(type)}</Text>
        <ProgressBar
          progress={progress}
          useIndicatorLevel={false}
          reverse={true}
          progressBarColor={'#aad326'}
          containerStyle={styles.progressContainer}
        />
        <Text
          style={[globalStyles.pageDetails, {marginStart: 0, marginTop: '2%'}]}>
          {goalItem.name}
        </Text>
      </View>
      <CHEV_RIGHT height={20} width={20} />
    </TouchableOpacity>
  );
}

function renderGoalLogo(type) {
  switch (type) {
    case bg:
      return renderLogIconNavy(bg_key);
    case food:
      return renderLogIconNavy(food_key);
    case med:
      return renderLogIconNavy(med_key);
    case weight:
      return renderLogIconNavy(weight_key);
    case activity:
      return renderLogIconNavy(activity_key);
    case steps:
      return renderLogIconNavy(step_key);
  }
}

function renderGoalTypeName(type) {
  switch (type) {
    case bg:
      return 'Blood Glucose Goal';
    case food:
      return 'Food Goal';
    case med:
      return 'Medication Goal';
    case weight:
      return 'Weight Goal';
    case activity:
      return 'Activity Goal';
    case steps:
      return 'Step Goal';
  }
}

const styles = StyleSheet.create({
  addbutton: {
    marginStart: '2%',
    color: '#aad326',
    fontSize: 20,
    marginTop: '2%',
  },
  goalType: {
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.lastLogValueColor,
    fontSize: 15,
    marginBottom: '2%',
  },
  progressContainer: {
    borderRadius: 9.5,
    height: 7,
  },
  border: {
    borderBottomWidth: 0.5,
    borderColor: Colors.lastLogValueColor,
    margin: '2%',
  },
  partyGoal: {
    marginStart: horizontalMargins,
    marginBottom: '2%',
    marginTop: 0,
  },
});
