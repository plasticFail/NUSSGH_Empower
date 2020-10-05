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
import CHEV_RIGHT from '../../resources/images/Patient-Icons/SVG/icon-grey-chevron-right.svg';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import {horizontalMargins} from '../../styles/variables';
//component
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import ProgressBar from '../../components/progressbar';
import GoalList from '../../components/goals/goalList';
import LoadingModal from '../../components/loadingModal';
import AddGoalModal from '../../components/goals/addGoalModal';
//third party lib
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//function
import {
  bg_key,
  renderLogIconNavy,
  food_key,
  med_key,
  weight_key,
  activity_key,
  step_key,
} from '../../commonFunctions/logFunctions';
import {getGoals} from '../../netcalls/requestsGoals';
import {
  bg,
  food,
  med,
  weight,
  activity,
  steps,
  filterForPatientGoal,
  isMonday,
} from '../../commonFunctions/goalFunctions';
import AboutGoals from '../../components/goals/aboutGoals';

const GoalsScreen = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [goals, setGoals] = useState({});
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setLoading(true);
    initGoals();
  }, []);

  const initGoals = async () => {
    console.log('getting latest goals');
    let data = await getGoals();
    setLoading(false);
    setGoals(data);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Goals</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={[globalStyles.pageDetails, {flex: 1}]}>
          Edit Your Targets
        </Text>
        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginEnd: '3%'}}
          onPress={() => setShowInfo(true)}>
          <Icon name="information-outline" size={30} color={'#aad326'} />
        </TouchableOpacity>
      </View>
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
      {/*Render Goals */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <GoalList goals={goals} init={initGoals} />
      </ScrollView>
      <AddGoalModal
        visible={openAdd}
        close={() => {
          console.log('closing add goal');
          initGoals();
          setOpenAdd(false);
        }}
      />
      <LoadingModal visible={loading} message={'Retrieving your goals'} />
      <AboutGoals visible={showInfo} closeModal={() => setShowInfo(false)} />
    </View>
  );
};

export default GoalsScreen;

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
  noGoalsText: {
    fontFamily: 'SFProDisplay-Regular',
    color: Colors.alertColor,
    fontSize: 18,
    margin: '3%',
  },
});
