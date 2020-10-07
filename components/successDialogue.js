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
import {food, defaultv} from '../commonFunctions/goalFunctions';
import ProgressBar from './progressbar';
import {isEmpty} from '../commonFunctions/common';

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
  const springAnim = useRef(new Animated.Value(0)).current;

  console.log('in success dialogue');
  console.log(isEmpty(goalObj));
  console.log(goalObj);

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
    navigation.navigate('Goals');
  };

  return (
    <Modal isVisible={visible} animationIn="slideInUp">
      <View style={styles.modalContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            marginTop: '3%',
            fontFamily: 'SFProDisplay-Bold',
          }}>
          {type} Completed
        </Text>
        <Animated.View
          style={{
            height: 80,
            width: 80,
            transform: [{scale: springAnim}],
          }}>
          <Ionicon
            name="checkmark-circle-outline"
            color={Colors.backArrowColor}
            size={80}
          />
        </Animated.View>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#aad326'}]}
          onPress={() => closeSuccess()}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
            <Text style={globalStyles.pageDetails}>+ {chance} Chance(s)</Text>
          </View>
          <View style={{flex: 1}} />
          <Icon name="chevron-right" size={30} style={styles.chevron} />
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
            {!isEmpty(goalObj) && goalObj?.set_by != defaultv ? (
              <>
                <ProgressBar
                  progress={progress}
                  useIndicatorLevel={false}
                  reverse={true}
                  progressBarColor={'#aad326'}
                  containerStyle={{
                    borderRadius: 9.5,
                    height: 10,
                    marginStart: '5%',
                  }}
                />
                <Text style={[globalStyles.pageDetails]}>{goalObj?.name}</Text>
              </>
            ) : (
              <Text style={[globalStyles.pageDetails, {flex: 1}]}>
                Add a goal now
              </Text>
            )}
          </View>
          <View style={{flex: 1}} />
          <Icon name="chevron-right" size={30} style={styles.chevron} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default SuccessDialogue;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
    paddingBottom: '10%',
  },
  button: {
    backgroundColor: '#EEF3BD',
    borderRadius: 9.5,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: Dimensions.get('window').width - 90,
  },
  buttonText: {
    fontSize: 23,
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
