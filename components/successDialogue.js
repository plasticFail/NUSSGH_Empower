import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//third party lib
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
//style
import {Colors} from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import {
  bg_key,
  med_key,
  food_key,
  weight_key,
} from '../commonFunctions/logFunctions';

import GAME from '../resources/images/Patient-Icons/SVG/icon-navy-game.svg';
import GOAL from '../resources/images/Patient-Icons/SVG/icon-navy-goals.svg';
import {getGoal4Type} from '../netcalls/requestsGoals';
import {
  defaultv,
  getGoalTypeFromLog,
} from '../commonFunctions/goalFunctions';
import ProgressBar from './progressbar';
import {isEmpty, role_patient} from '../commonFunctions/common';
import {getRole} from '../storage/asyncStorageFunctions';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

const iconStyle = {
  width: 50,
  height: 50,
  marginTop: '3%',
  padding: '3%',
};

const progress = '30%';

function SuccessDialogue(props) {
  const {visible, type} = props;
  const {closeSuccess} = props;
  const navigation = useNavigation();
  const [chance, setChance] = useState(0);
  const [goalObj, setGoalObj] = useState([]);
  const [role, setRole] = useState('');
  const springAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setGoalObj({});
    let isMounted = true;
    if (isMounted) {
      if (type === bg_key) {
        setChance(1);
      }
      if (type === food_key) {
        setChance(3);
      }
      if (type === med_key) {
        setChance(2);
      }
      if (type === weight_key) {
        setChance(0.5);
      }
      //set goal
      setGoal(type).then(() => {});

      getRole().then((rsp) => {
        setRole(rsp);
      });

      setTimeout(() => {
        Animated.spring(springAnim, {
          toValue: 1,
          friction: 2,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
    return () => {
      isMounted = false;
    };
  }, [visible, type]);

  const setGoal = async (type) => {
    let response = await getGoal4Type(type);
    setGoalObj(response?.goals[0]);
  };

  const goGameCenter = () => {
    closeSuccess();
    navigation.navigate('GameCenter');
  };

  const goGoals = () => {
    closeSuccess();
    if (role === role_patient) {
      navigation.navigate('Goals', {
        type: getGoalTypeFromLog(type),
        item: goalObj,
      });
    }
  };

  return (
    <Modal isVisible={visible} animationIn="slideInUp">
      <View style={styles.modalContainer}>
        <Text
          style={{
            fontSize: adjustSize(20),
            fontWeight: '500',
            marginTop: '3%',
            fontFamily: 'SFProDisplay-Bold',
          }}>
          {type} Completed
        </Text>
        <Animated.View
          style={{
            height: adjustSize(80),
            width: adjustSize(80),
            transform: [{scale: springAnim}],
          }}>
          <Ionicon
            name="checkmark-circle-outline"
            color={Colors.backArrowColor}
            size={adjustSize(80)}
          />
        </Animated.View>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#aad326'}]}
          onPress={() => closeSuccess()}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {role === role_patient && (
          <>
            <View style={[styles.border, {marginTop: '7%'}]} />
            {/*Game Center */}
            <TouchableOpacity
              style={{flexDirection: 'row', marginStart: '6%', marginTop: '3%'}}
              onPress={() => goGameCenter()}>
              <GAME {...iconStyle} />
              <View style={{marginStart: '4%', marginTop: '2%'}}>
                <Text
                  style={[
                    globalStyles.pageDetails,
                    {color: Colors.lastLogValueColor},
                  ]}>
                  Game Center
                </Text>
                <Text style={globalStyles.pageDetails}>
                  + {chance} Chance(s)
                </Text>
              </View>
              <View style={{flex: 1}} />
              <Icon name="chevron-right" size={adjustSize(30)} style={styles.chevron} />
            </TouchableOpacity>
            <View style={[styles.border, {marginTop: '7%'}]} />

            {/*Goals */}
            <TouchableOpacity
              style={{flexDirection: 'row', marginStart: '6%', marginTop: '3%'}}
              onPress={() => goGoals()}>
              <GOAL {...iconStyle} />
              <View style={{marginStart: '4%', marginTop: '2%', flex: 3}}>
                <Text
                  style={[
                    globalStyles.pageDetails,
                    {color: Colors.lastLogValueColor},
                  ]}>
                  Goal
                </Text>
                {!isEmpty(goalObj) && goalObj?.set_by !== defaultv ? (
                  <>
                    <ProgressBar
                      progress={progress}
                      useIndicatorLevel={false}
                      reverse={true}
                      progressBarColor={'#aad326'}
                      containerStyle={{
                        borderRadius: adjustSize(9.5),
                        height: adjustSize(10),
                        marginStart: '5%',
                      }}
                    />
                    <Text style={[globalStyles.pageDetails]}>
                      {goalObj?.name}
                    </Text>
                  </>
                ) : (
                  <Text
                    style={[
                      globalStyles.pageDetails,
                      {flex: 1, marginBottom: 0},
                    ]}>
                    Add a goal now
                  </Text>
                )}
              </View>
              <View style={{flex: 1}} />
              <Icon name="chevron-right" size={adjustSize(30)} style={styles.chevron} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
}

export default SuccessDialogue;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: adjustSize(20),
    width: '100%',
    paddingBottom: '10%',
    paddingTop: '2%',
  },
  button: {
    backgroundColor: '#EEF3BD',
    borderRadius: adjustSize(9.5),
    marginVertical: adjustSize(10),
    paddingVertical: adjustSize(10),
    paddingHorizontal: adjustSize(40),
    width: Dimensions.get('window').width - adjustSize(90),
  },
  buttonText: {
    fontSize: adjustSize(23),
    fontWeight: '500',
    textAlign: 'center',
  },
  border: {
    borderWidth: 0.5,
    borderColor: Colors.lastLogValueColor,
    width: '100%',
  },
  chevron: {
    marginEnd: '10%',
    marginTop: '6%',
    color: Colors.lastLogValueColor,
  },
});
