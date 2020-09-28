import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//component
import CircularProgress from '../CircularProgress';
import ProgressBar from '../../../progressbar';
//third party lib
import Icon from 'react-native-vector-icons/FontAwesome5';

const TARGET_STEPS = 5000;

export default function ActivityCard(props) {
  const {stepsTaken, carb, protein, fat} = props;
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.card,
        styles.shadow,
        {
          margin: '5%',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '7%',
        },
      ]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Reports', {initialTab: 4})}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomWidth: 0.5,
          borderColor: '#7d7d7d',
          padding: 20,
          width: '100%',
        }}>
        <View style={{width: '45%', alignItems: 'center'}}>
          <CircularProgress
            color="#aad326"
            percent={stepsTaken / TARGET_STEPS}
            centreComponent={{
              width: 40 / 2,
              height: 40 / 1.5,
              component: <Icon name="walking" color="#aad326" size={40} />,
            }}
            radius={50}
            padding={5}
            strokeWidth={5}
            fontSize={15}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#7d7d7d',
              fontSize: 16,
              fontFamily: 'SFProDisplay-Regular',
            }}>
            Steps
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {stepsTaken}
          </Text>
        </View>
        <View style={{width: '45%', alignItems: 'center'}}>
          <CircularProgress
            color="#aad326"
            percent={0.65}
            centreComponent={{
              width: 40 / 2,
              height: 40 / 1.5,
              component: <Icon name="fire" color="#aad326" size={40} />,
            }}
            radius={50}
            padding={5}
            strokeWidth={5}
            fontSize={15}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#7d7d7d',
              fontSize: 16,
              fontFamily: 'SFProDisplay-Regular',
            }}>
            Calories Burnt
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>350 kcal</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Reports', {initialTab: 1})}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          padding: 20,
        }}>
        <View style={{width: '25%'}}>
          <Text
            style={{fontWeight: 'bold', color: '#7d7d7d', paddingBottom: 5}}>
            Carbs
          </Text>
          <ProgressBar
            containerStyle={{height: 7.5, width: '90%', marginBottom: 5}}
            progress={'33%'}
            useIndicatorLevel
          />
          <Text style={{fontWeight: 'bold'}}>{carb} g</Text>
        </View>
        <View style={{width: '25%'}}>
          <Text
            style={{fontWeight: 'bold', color: '#7d7d7d', paddingBottom: 5}}>
            Protein
          </Text>
          <ProgressBar
            containerStyle={{height: 7.5, width: '90%', marginBottom: 5}}
            progress={'33%'}
            useIndicatorLevel
          />
          <Text style={{fontWeight: 'bold'}}>{protein} g</Text>
        </View>
        <View style={{width: '25%'}}>
          <Text
            style={{fontWeight: 'bold', color: '#7d7d7d', paddingBottom: 5}}>
            Fat
          </Text>
          <ProgressBar
            containerStyle={{height: 7.5, width: '90%', marginBottom: 5}}
            progress={'33%'}
            useIndicatorLevel
          />
          <Text style={{fontWeight: 'bold'}}>{fat} g</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
