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

function SuccessDialogue(props) {
  const {visible, type} = props;
  const {closeSuccess} = props;
  const navigation = useNavigation();
  const [chance, setChance] = useState(0);
  const springAnim = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
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
      setTimeout(() => {
        Animated.spring(springAnim, {
          toValue: 1,
          friction: 1,
          useNativeDriver: true,
        }).start();
      }, 1300);
    }
    return () => {
      isMounted = false;
    };
  }, [type]);

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
          <Icon name="gamepad" size={50} color={'black'} />
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
          <Icon name="chevron-right" size={20} style={styles.chevron} />
        </TouchableOpacity>
        <View style={[styles.border, {marginTop: '7%'}]} />
        {/*Goals */}
        <TouchableOpacity
          style={{flexDirection: 'row', marginStart: '6%', marginTop: '3%'}}
          onPress={() => goGoals()}>
          <Feather name="target" size={50} color={'black'} />
          <View style={{marginStart: '4%', marginTop: '2%'}}>
            <Text
              style={[
                globalStyles.pageDetails,
                {color: Colors.lastLogValueColor},
              ]}>
              Goal
            </Text>
          </View>
          <View style={{flex: 1}} />
          <Icon name="chevron-right" size={20} style={styles.chevron} />
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
